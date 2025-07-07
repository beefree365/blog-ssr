require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'blog-posts';

const sampleTags = [
  ['数学', '公式', '测试', 'Markdown', '复杂样式'],
  ['编程', '代码', 'JavaScript', '示例', '测试'],
  ['表格', '数据', '展示', '样式', '测试'],
  ['物理', '公式', '实验', 'Markdown', '复杂样式'],
  ['化学', '分子', '公式', '实验', '测试']
];

const sampleContents = [
  // 文章1
  `## 文章示例：数学公式与表格

本文演示了数学公式、表格和代码的混合排版。

### 公式示例

行内公式：$E=mc^2$，块级公式：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

### 代码示例

~~~
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2));
~~~

### 表格示例

| 姓名 | 分数 |
| ---- | ---- |
| 张三 | 95   |
| 李四 | 88   |
| 王五 | 76   |

以上内容用于测试复杂 Markdown 的显示效果。内容补充：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
  // 文章2
  `## 文章示例：编程与代码块

本文包含多种编程语言的代码块。

### JavaScript 代码

~~~
const arr = [1, 2, 3];
arr.forEach(x => console.log(x));
~~~

### Python 代码

~~~
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        print(a)
        a, b = b, a + b
~~~

### 复杂内容

- 列表项一
- 列表项二
- 列表项三

内容补充：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
  // 文章3
  `## 文章示例：表格与公式

### 数据表格

| 项目 | 数值 |
| ---- | ---- |
| A    | 123  |
| B    | 456  |
| C    | 789  |

### 公式

$$
a^2 + b^2 = c^2
$$

### 说明

本表格用于测试表格渲染，公式用于测试数学渲染。

内容补充：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
  // 文章4
  `## 文章示例：物理实验与公式

### 实验步骤

1. 连接电路
2. 测量电压
3. 记录数据

### 物理公式

$$
F=ma
$$

### 代码

~~~
#include <stdio.h>
int main() {
    printf("Hello, Physics!\n");
    return 0;
}
~~~

内容补充：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
  // 文章5
  `## 文章示例：化学分子结构

### 分子式

水的分子式为 $H_2O$。

### 表格

| 元素 | 数量 |
| ---- | ---- |
| H    | 2    |
| O    | 1    |

### 代码

~~~
# 计算水分子质量
H = 1.008
O = 15.999
mass = 2 * H + O
print(mass)
~~~

内容补充：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`
];

const samplePosts = sampleContents.map((content, i) => ({
  id: uuidv4(),
  title: `复杂样式示例文章 ${i + 1}`,
  content,
  date: new Date(Date.now() - i * 86400000).toISOString(),
  tags: sampleTags[i]
}));

async function insertPosts() {
  for (const post of samplePosts) {
    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: post
    }).promise();
    console.log(`已插入: ${post.title}`);
  }
  console.log('全部复杂样式文章插入完成');
}

insertPosts().catch(console.error);
