const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = process.env.DYNAMODB_TABLE;

async function getAllPosts() {
  const params = { TableName: TABLE_NAME };
  const data = await dynamodb.scan(params).promise();
  // 按日期倒序
  return (data.Items || []).sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getPostById(id) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const data = await dynamodb.get(params).promise();
  return data.Item;
}

module.exports = { getAllPosts, getPostById }; 