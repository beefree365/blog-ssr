require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: process.env.DYNAMODB_TABLE || 'blog-posts',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  BillingMode: 'PAY_PER_REQUEST'
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('创建表失败:', err);
  } else {
    console.log('表创建成功:', data.TableDescription.TableName);
  }
}); 