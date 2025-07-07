import { getAllPosts } from '../lib/aws';
import Link from 'next/link';

export async function getServerSideProps() {
  const posts = await getAllPosts();
  // 聚合所有分类
  const categoryMap = {};
  posts.forEach(post => {
    const category = post.category || '未分类';
    if (!categoryMap[category]) categoryMap[category] = [];
    categoryMap[category].push(post);
  });
  return { props: { categoryMap } };
}

export default function Categories({ categoryMap }) {
  return (
    <>
      <h1>分类</h1>
      <ul>
        {Object.entries(categoryMap).map(([cat, posts]) => (
          <li key={cat} style={{marginBottom:'2em'}}>
            <Link href={`/category/${encodeURIComponent(cat)}`}><span style={{color:'#1abc9c',fontWeight:600,fontSize:'1.1em'}}>{cat}</span></Link> <span style={{color:'#888'}}>({posts.length})</span>
            <ul style={{marginTop:12}}>
              {posts.map(post => (
                <li key={post.id}>
                  <Link href={`/post/${post.id}`}><b>{post.title}</b></Link>
                  <div style={{marginTop:6}}><small>{post.date?.slice(0,10)}</small></div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
} 