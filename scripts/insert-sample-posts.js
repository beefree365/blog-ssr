require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const samplePosts = Array.from({ length: 20 }).map((_, i) => ({
  id: uuidv4(),
  title: `示例文章 ${i + 1}`,
  content: `这是第 ${i + 1} 篇示例文章的内容。\n\n支持多行文本和 markdown。`,
  date: new Date(Date.now() - i * 86400000).toISOString(),
  tags: ['示例', '测试']
}));

async function insertPosts() {
  for (const post of samplePosts) {
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE || 'blog-posts',
      Item: post
    }).promise();
    console.log(`已插入: ${post.title}`);
  }
  console.log('全部插入完成');
}

insertPosts().catch(console.error); 