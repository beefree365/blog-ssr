import { getAllPosts } from '../lib/aws';
import Link from 'next/link';

export async function getServerSideProps() {
  const posts = await getAllPosts();
  // 聚合所有标签
  const tagMap = {};
  posts.forEach(post => {
    (post.tags || []).forEach(tag => {
      tagMap[tag] = tagMap[tag] || [];
      tagMap[tag].push(post);
    });
  });
  return { props: { tagMap } };
}

export default function Tags({ tagMap }) {
  return (
    <>
      {/* <h1>标签</h1> */}
      <div className="tag-cloud">
        {Object.entries(tagMap).map(([tag, posts]) => (
          <span key={tag}>
            <Link href={`/tag/${encodeURIComponent(tag)}`}>{tag}</Link>
            <span className="count">({posts.length})</span>
          </span>
        ))}
      </div>
      <ul>
        {Object.entries(tagMap).map(([tag, posts]) => (
          <li key={tag} style={{marginBottom:'2em'}}>
            <Link href={`/tag/${encodeURIComponent(tag)}`}><span style={{color:'#1abc9c',fontWeight:600,fontSize:'1.1em'}}>{tag}</span></Link>
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