require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'blog-posts';

async function getAllPostIds() {
  let items = [];
  let ExclusiveStartKey = undefined;
  do {
    const params = {
      TableName: TABLE_NAME,
      ProjectionExpression: 'id',
      ExclusiveStartKey,
    };
    const data = await dynamodb.scan(params).promise();
    items = items.concat(data.Items);
    ExclusiveStartKey = data.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items.map(item => item.id);
}

async function batchDelete(ids) {
  const BATCH_SIZE = 25;
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const params = {
      RequestItems: {
        [TABLE_NAME]: batch.map(id => ({ DeleteRequest: { Key: { id } } }))
      }
    };
    await dynamodb.batchWrite(params).promise();
    console.log(`已删除 ${i + batch.length} / ${ids.length}`);
  }
}

async function main() {
  const ids = await getAllPostIds();
  if (ids.length === 0) {
    console.log('没有文章需要删除');
    return;
  }
  await batchDelete(ids);
  console.log('所有文章已删除');
}

main().catch(console.error); 