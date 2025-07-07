// fetch-posts.js
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// AWS 配置（请替换为你的 AWS 访问密钥和区域）
AWS.config.update({
  region: 'ap-northeast-1', // 例如东京
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'blog-posts';
const POSTS_DIR = path.join(__dirname, '../source/_posts');

async function fetchPosts() {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await dynamodb.scan(params).promise();
  return data.Items;
}

function writeMarkdown(post) {
  const fileName = `${post.id}.md`;
  const filePath = path.join(POSTS_DIR, fileName);
  const content = `---\ntitle: ${post.title}\ndate: ${post.date}\ntags: ${(post.tags || []).join(' ')}\n---\n\n${post.content}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

async function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  const posts = await fetchPosts();
  posts.forEach(writeMarkdown);
  console.log('已生成所有文章');
}

main(); 