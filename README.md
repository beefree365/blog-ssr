# Next.js + Vercel + AWS DynamoDB 极简动态博客

## 在线演示

已部署地址：https://blog-ssr-tawny.vercel.app/

## 方案说明

- 使用 Next.js 实现服务端渲染（SSR），页面内容实时从 AWS DynamoDB 获取。
- 部署在 Vercel，支持自动化构建与全球加速访问。
- 博客内容存储在 AWS DynamoDB，支持实时动态渲染。
- 页面风格极简，高度还原 Hexo Next 主题，适合内容专注型博客。

---

## 目录结构

```
├── components/
│   ├── HeaderBar.js         # 全局顶部信息栏组件
│   ├── Layout.js            # 页面主卡片布局组件
│   ├── Toc.js               # 目录树（TOC）组件，支持多级锚点
│   └── TopNav.js            # 主导航条组件
├── lib/
│   └── aws.js               # AWS DynamoDB 数据获取与封装
├── pages/
│   ├── _app.js              # Next.js 全局入口
│   ├── index.js             # 首页，极简文章列表
│   ├── about.js             # 关于页
│   ├── archives.js          # 归档页，按年份分组
│   ├── categories.js        # 分类页
│   ├── tags.js              # 标签页，含标签云
│   ├── post/
│   │   └── [id].js          # 文章详情页，支持 Markdown+公式+目录树
│   ├── tag/
│   │   └── [name].js        # 单标签文章列表页
│   └── category/
│       └── [name].js        # 单分类文章列表页
├── public/
│   └── avatar.png           # 头像等静态资源（如有）
├── scripts/
│   ├── create-table.js              # 创建 DynamoDB 表结构
│   ├── insert-sample-posts.js       # 批量插入基础样本数据
│   ├── insert-more-sample-posts.js  # 批量插入多样化样本数据（多标签/分类/丰富内容）
│   ├── insert-math-table-posts.js   # 插入含数学公式/表格的样本文章
│   └── fetch-posts.js               # 从 DynamoDB 导出所有文章为 markdown 文件
├── source/
│   └── _posts/                      # 导出 markdown 文章存放目录（可选）
├── styles/
│   ├── globals.css          # 全局极简样式
│   ├── HeaderBar.module.css # 顶部信息栏样式
│   ├── Layout.module.css    # 主卡片布局样式
├── themes/
│   └── simple/
│       ├── layout/
│       │   ├── index.ejs    # Hexo Next 主题首页模板
│       │   └── post.ejs     # Hexo Next 主题文章模板
│       └── source/
│           └── css/
│               └── style.css # Hexo Next 主题极简样式
├── blog.config.js           # 博客基础信息与个性化配置
├── package.json             # 依赖与启动脚本
├── .env.example             # 环境变量模板
├── .env                     # 你的 AWS 配置信息（需手动创建，已 gitignore）
└── README.md                # 项目说明文档
```

---

## 主要文件与作用

- `components/`：全局 UI 组件（导航、卡片布局、目录树等），实现极简 Next 主题风格。
- `lib/aws.js`：封装 DynamoDB 文章数据的获取与单篇查询。
- `pages/`：所有页面，支持首页、详情、分类、标签、归档、关于等，全部极简卡片风格。
- `public/`：静态资源（如头像）。
- `scripts/`：自动化脚本，支持表结构创建、批量插入多样化样本数据、导出文章等。
- `source/_posts/`：可选，导出 markdown 文章存放目录。
- `styles/`：全局与组件级 CSS，主色调灰黑，极简风格。
- `themes/simple/`：Hexo Next 主题模板与样式参考，便于迁移和对比。
- `blog.config.js`：博客昵称、简介、头像、社交等基础配置。
- `.env/.env.example`：AWS 相关密钥与 DynamoDB 表名配置，`.env` 已安全忽略。
- `package.json`：依赖与启动脚本说明。
- `README.md`：项目说明与操作文档。

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

## 进阶说明与当前进度

- **主题与页面结构**：高度还原 Hexo Next，顶部主导航条+信息区居中，主内容区唯一卡片背景，目录树独立于正文卡片外部左侧，移动端自适应。
- **功能与交互**：导航高亮、标签云 hover、目录树多级锚点、主色调统一、无"卡片套卡片"。
- **数据与样本**：支持批量插入多标签/分类/丰富内容/表格/公式的样本文章，DynamoDB 表结构灵活。
- **Markdown 渲染**：前端集成 MathJax，完美支持行内/块级公式，表格渲染无兼容性问题。
- **安全与 GitHub**：.env 已彻底 gitignore，历史敏感信息已清除，推送安全合规。
- **README**：已详细记录环境配置、表结构、批量插入脚本、主题风格、Markdown/公式/表格支持、样式多轮优化等全部主要步骤。

---

## 依赖与启动

- 安装依赖：`npm install`
- 启动开发：`npm run dev`
- 访问 `http://localhost:3000` 预览极简博客

---

## 其他说明

- **脚本使用**：所有脚本均支持 node 直接运行，需先配置好 `.env`。
- **主题迁移**：`themes/simple/` 目录为 Hexo Next 主题参考模板，便于迁移和对比。
- **个性化**：可通过 `blog.config.js` 配置昵称、简介、头像、社交等信息。
- **安全建议**：切勿将 `.env` 推送到 GitHub，密钥管理详见本 README 前述安全说明。

---

如需进一步自定义或遇到问题，欢迎随时提问！ 

---

## Vercel 部署步骤

1. **推送代码到 GitHub**
   - 确保你的项目已上传到 GitHub 仓库。

2. **注册并登录 Vercel**
   - 访问 https://vercel.com/，用 GitHub 账号注册并登录。

3. **新建 Vercel 项目**
   - 点击 “Add New” → “Project”，选择你的 blog-clean 仓库，点击“Import”。

4. **配置环境变量**
   - 在 Vercel 项目设置 → Environment Variables，添加：
     - `AWS_REGION`
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `DYNAMODB_TABLE`
   - 值与本地 .env 保持一致。

5. **自动检测 Next.js 并部署**
   - Vercel 会自动识别 Next.js 项目，无需手动设置构建命令。
   - 点击“Deploy”按钮，等待自动部署完成。

6. **访问你的博客**
   - 部署完成后，Vercel 会分配一个 *.vercel.app 域名（如 https://blog-ssr-tawny.vercel.app/）。
   - 可在 Vercel 控制台绑定自定义域名。

7. **后续管理**
   - 推送新代码到 GitHub，Vercel 会自动重新部署。
   - 可在 Vercel 控制台管理环境变量、域名、部署历史等。

--- 