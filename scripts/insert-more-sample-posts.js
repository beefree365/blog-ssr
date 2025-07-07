const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tagsList = [
  ['前端'],
  ['后端'],
  ['云原生'],
  ['AI'],
  ['生活'],
  ['随笔'],
  ['React'],
  ['Node.js'],
  ['算法'],
  ['工具'],
  ['前端','React'],
  ['后端','Node.js'],
  ['AI','算法'],
  ['生活','随笔'],
  ['云原生','工具'],
  ['前端','工具'],
  ['后端','算法'],
  ['AI','工具'],
  ['React','算法'],
  ['生活','AI']
];
const titles = [
  '前端开发的那些事',
  '后端架构演进',
  '云原生入门与实践',
  'AI 时代的思考',
  '生活中的编程乐趣',
  '随笔：成长与反思',
  'React 组件设计',
  'Node.js 实用技巧',
  '算法的艺术',
  '开发者常用工具',
  'React 与前端协作',
  'Node.js 与后端服务',
  'AI 与算法结合',
  '生活随笔：点滴记录',
  '云原生工具链',
  '前端开发利器',
  '后端算法优化',
  'AI 助力开发',
  'React 算法实践',
  'AI 改变生活'
];
const contents = [
  `# 概述\n前端开发日新月异，框架层出不穷。\n\n## 经验分享\n- 组件化思想\n- 性能优化\n\n**总结：** 持续学习是前端成长的关键。`,
  `# 后端演进\n后端架构从单体到微服务。\n\n## 技术选型\n- Node.js\n- Go\n\n**体会：** 架构要服务于业务。`,
  `# 云原生\n云原生让部署更简单。\n\n## 实践\n- Docker\n- Kubernetes\n\n**建议：** 多动手实践。`,
  `# AI 时代\nAI 正在改变世界。\n\n## 应用场景\n- 智能推荐\n- 自动驾驶\n\n**思考：** 拥抱变化。`,
  `# 编程乐趣\n生活中处处有编程。\n\n## 小项目\n- 自动记账\n- 智能家居\n\n**结论：** 编程让生活更美好。`,
  `# 随笔\n成长路上有迷茫也有收获。\n\n## 反思\n- 坚持\n- 复盘\n\n**寄语：** 保持热爱。`,
  `# React 组件\n组件复用是提升效率的关键。\n\n## 设计要点\n- 单一职责\n- 易于测试\n\n**建议：** 多写多练。`,
  `# Node.js 技巧\nNode.js 适合 IO 密集型应用。\n\n## 实用模块\n- fs\n- path\n\n**经验：** 善用官方文档。`,
  `# 算法艺术\n算法是程序的灵魂。\n\n## 常见算法\n- 排序\n- 查找\n\n**建议：** 多刷题。`,
  `# 工具推荐\n开发工具提升效率。\n\n## 常用工具\n- VSCode\n- Git\n\n**结论：** 工欲善其事必先利其器。`,
  `# React 协作\n团队协作提升项目质量。\n\n## 协作方式\n- 代码评审\n- 组件复用\n\n**建议：** 沟通为先。`,
  `# Node.js 服务\n后端服务要高可用。\n\n## 技术选型\n- Express\n- Koa\n\n**体会：** 简单就是美。`,
  `# AI 算法\nAI 离不开算法。\n\n## 算法类型\n- 机器学习\n- 深度学习\n\n**建议：** 理论结合实践。`,
  `# 生活记录\n记录点滴，见证成长。\n\n## 记录方式\n- 日记\n- 博客\n\n**结论：** 记录让人进步。`,
  `# 云原生工具\n工具链让云原生更高效。\n\n## 推荐工具\n- Helm\n- Istio\n\n**建议：** 善用社区资源。`,
  `# 前端利器\n前端开发工具推荐。\n\n## 工具\n- Webpack\n- Babel\n\n**结论：** 工具选得好，效率翻倍。`,
  `# 算法优化\n后端算法优化实践。\n\n## 优化点\n- 时间复杂度\n- 空间复杂度\n\n**建议：** 先写对再写快。`,
  `# AI 助力\nAI 可以辅助开发。\n\n## 应用\n- 代码补全\n- 智能测试\n\n**体会：** 善用 AI。`,
  `# React 算法\nReact 项目中的算法实践。\n\n## 实例\n- 虚拟 DOM\n- Diff 算法\n\n**建议：** 理解原理。`,
  `# AI 生活\nAI 正在改变生活方式。\n\n## 场景\n- 智能家居\n- 健康管理\n\n**结论：** 拥抱智能时代。`
];

async function insertPosts() {
  for (let i = 0; i < 20; i++) {
    const post = {
      id: uuidv4(),
      title: titles[i],
      content: contents[i],
      date: new Date(Date.now() - i * 86400000).toISOString(),
      tags: tagsList[i]
    };
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: post
    }).promise();
    console.log(`已插入: ${post.title}`);
  }
  console.log('全部插入完成');
}

insertPosts().catch(console.error); 