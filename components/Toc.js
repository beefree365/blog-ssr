import { useEffect, useState } from 'react';

export default function Toc({ content }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // 解析 content，提取 h2/h3
    const div = document.createElement('div');
    div.innerHTML = content;
    const headers = Array.from(div.querySelectorAll('h2, h3'));
    const tocList = headers.map(h => ({
      id: h.id || h.textContent.replace(/\s+/g, '-'),
      text: h.textContent,
      level: h.tagName === 'H2' ? 2 : 3
    }));
    setToc(tocList);
  }, [content]);

  if (!toc.length) return null;

  return (
    <nav style={{background:'none',padding:'0',borderRadius:0,boxShadow:'none',fontSize:'1em',marginBottom:24}}>
      <div style={{fontWeight:'bold',fontSize:'1.08em',marginBottom:12,color:'#1abc9c'}}>文章目录</div>
      <ul style={{listStyle:'none',padding:0,margin:0}}>
        {toc.map(item => (
          <li key={item.id} style={{marginBottom:8,marginLeft:item.level===3?18:0}}>
            <a href={`#${item.id}`} style={{color:'#23272f',textDecoration:'none',transition:'color 0.18s'}}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 