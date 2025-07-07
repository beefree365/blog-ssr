const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const posts = [
  {
    id: uuidv4(),
    title: '数学公式测试',
    content: `## 数学公式测试2\n\n这是一个包含数学公式的测试文章。\n\n行内公式示例：$E=mc^2$\n\n块级公式示例：\n\n$$\n\\int_{0}^{1} x^2 dx = \\frac{1}{3}\n$$`,
    tags: ['测试', '公式'],
    categories: ['Markdown'],
    date: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: '表格渲染测试',
    content: `# 表格渲染测试\n\n下面是一个 Markdown 表格：\n\n| 姓名   | 年龄 | 职业   |\n| ------ | ---- | ------ |\n| 张三   | 28   | 程序员 |\n| 李四   | 32   | 设计师 |\n| 王五   | 24   | 产品经理 |\n\n表格下方可以有普通文本。`,
    tags: ['测试', '表格'],
    categories: ['Markdown'],
    date: new Date().toISOString(),
  }
];

async function insertPosts() {
  for (const post of posts) {
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: post
    }).promise();
    console.log(`已插入: ${post.title}`);
  }
  console.log('全部插入完成');
}

insertPosts().catch(console.error); 