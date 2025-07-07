# Next.js + Vercel + AWS DynamoDB 极简动态博客

## 方案说明

- 使用 Next.js 实现服务端渲染（SSR），页面内容实时从 AWS DynamoDB 获取。
- 部署在 Vercel，支持自动化构建与全球加速访问。
- 博客内容存储在 AWS DynamoDB，支持实时动态渲染。
- 页面风格极简，无多余功能，适合内容专注型博客。

---

## 目录结构

```
├── lib/
│   └── aws.js           # AWS DynamoDB 文章数据获取工具
├── pages/
│   ├── index.js         # 首页，服务端渲染文章列表
│   └── post/
│       └── [id].js      # 详情页，服务端渲染单篇文章
├── styles/
│   └── globals.css      # 极简全局样式
├── scripts/
│   ├── create-table.js          # 创建 DynamoDB 表的脚本
│   └── insert-sample-posts.js   # 批量插入样本数据的脚本
├── package.json         # 依赖说明
├── .env.example         # 环境变量模板
├── .env                 # 你的 AWS 配置信息（需手动创建）
└── README.md            # 项目说明文档
```

---

## 每个文件的作用

- `lib/aws.js`：封装 AWS DynamoDB 的连接与数据获取方法。
- `pages/index.js`：博客首页，服务端渲染所有文章列表。
- `pages/post/[id].js`：文章详情页，服务端渲染单篇文章内容。
- `styles/globals.css`：全局极简样式，保证页面整洁美观。
- `scripts/create-table.js`：自动创建 DynamoDB 表的脚本。
- `scripts/insert-sample-posts.js`：批量插入 20 条样本数据的脚本。
- `package.json`：项目依赖与脚本说明。
- `.env.example`：环境变量模板，供你参考填写。
- `.env`：你的 AWS 相关密钥和表名（需手动创建并填写）。
- `README.md`：项目说明文档。

---

## 已完成的步骤

1. **配置环境变量**
   - 复制 `.env.example` 为 `.env`，填写你的 AWS 相关信息：
     ```env
     AWS_ACCESS_KEY_ID=你的AWS访问密钥ID
     AWS_SECRET_ACCESS_KEY=你的AWS访问密钥
     AWS_REGION=ap-northeast-1（或你的实际区域）
     DYNAMODB_TABLE=blog-posts
     ```

2. **自动创建 DynamoDB 表**
   - 运行 `node scripts/create-table.js`，自动创建 `blog-posts` 表。

3. **批量插入样本数据**
   - 运行 `node scripts/insert-sample-posts.js`，自动插入 20 条示例文章。
   - 运行 `node scripts/insert-more-sample-posts.js`、`node scripts/insert-math-table-posts.js`，可插入多样化内容（含表格、公式等）。

4. **极简主题与页面结构**
   - 主题风格高度还原 Hexo Next，所有页面均为极简卡片风格，支持响应式。
   - 目录树（TOC）可独立于正文卡片外显示，风格与 Next 主题一致。
   - 标签、分类、归档、关于等页面全部极简、无多余装饰。

5. **Markdown 高级渲染支持**
   - 支持 Markdown 表格、KaTeX/MathJax 公式渲染，数学公式（行内/块级）和表格均可正常显示。

6. **多轮样式与细节优化**
   - 根据反馈持续优化卡片层级、导航高亮、目录树、标签 hover、主色调等细节，最终实现极简、专业、统一的视觉体验。

7. **依赖安装与本地开发**
   - 安装依赖：`npm install`
   - 启动开发：`npm run dev`
   - 访问 `http://localhost:3000` 预览博客

---

## 后续步骤

1. **推送代码到 GitHub 仓库**
   - 初始化 git（如未初始化）：`git init`
   - 添加远程仓库并推送代码：
     ```bash
     git add .
     git commit -m "init blog"
     git remote add origin <你的GitHub仓库地址>
     git push -u origin main
     ```

2. **在 Vercel 新建项目并部署**
   - 访问 [https://vercel.com](https://vercel.com)
   - 登录后，点击"New Project"，选择你的 GitHub 仓库
   - 选择 Next.js 作为框架
   - 在 Vercel 项目设置中添加环境变量（与 `.env` 一致）
   - 部署完成后，访问 Vercel 分配的域名即可看到你的博客

3. **后续内容维护**
   - 通过 AWS 控制台或 API 向 DynamoDB 表中插入/编辑文章，页面会实时展示最新内容。
   - 如需自定义样式或功能，可修改 `styles/globals.css` 或页面文件。

---

## 预览效果

- 首页：极简文章列表，显示标题和日期，点击进入详情页
- 详情页：显示标题、日期、正文，无多余功能

---

如需进一步自定义或遇到问题，欢迎随时提问！ 