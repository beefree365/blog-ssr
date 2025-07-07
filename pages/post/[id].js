import { getPostById } from '../../lib/aws';
import Toc from '../../components/Toc';
import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import 'katex/dist/katex.min.css';
import Layout from '../../components/Layout';

marked.use(markedKatex({ throwOnError: false }));

export async function getServerSideProps({ params }) {
  const post = await getPostById(params.id);
  if (!post) return { notFound: true };
  return { props: { post } };
}

function addHeadingIds(html) {
  // 为 h2/h3 自动添加 id
  return html.replace(/<(h[23])>(.*?)<\/\1>/g, (m, tag, text) => {
    const id = text.replace(/\s+/g, '-');
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
}

export default function PostPage({ post }) {
  const [html, setHtml] = useState('');
  const contentRef = useRef();

  useEffect(() => {
    // 支持 markdown 渲染
    let htmlContent = marked.parse(post.content || '');
    htmlContent = addHeadingIds(htmlContent);
    setHtml(htmlContent);
  }, [post.content]);

  // 新增：每次 html 变化后触发 MathJax 渲染
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [html]);

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',width:'100%',paddingTop:24}}>
      {/* 目录树在卡片外部 */}
      {/* <aside style={{minWidth:180,maxWidth:220,marginRight:32,position:'sticky',top:80,alignSelf:'flex-start',background:'none',boxShadow:'none',padding:0,borderRight:'1px solid #f0f0f0',height:'100%'}}>
        <Toc content={html} />
      </aside> */}
      {/* 正文卡片，依然由 Layout 包裹 */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>
        {/* <main style={{width:'100%',maxWidth:820}}> */}
          <h1 style={{textAlign:'center',fontSize:'2.2em',fontWeight:700,margin:'0.5em 0 0.2em 0'}}>{post.title}</h1>
          <p style={{textAlign:'center',marginBottom:'1.5em',color:'#888',fontSize:'1em'}}><small>{post.date?.slice(0,10)}</small></p>
          <article ref={contentRef} style={{width:'100%',maxWidth:700,fontSize:'1.12em',lineHeight:'1.85',marginTop:'0.5em'}} dangerouslySetInnerHTML={{ __html: html }} />
        {/* </main> */}
      </div>
      <script
        id="mathjax"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        async
      ></script>
    </div>
  );
} 