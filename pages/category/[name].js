import { getAllPosts } from '../../lib/aws';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const posts = await getAllPosts();
  const category = params.name;
  const filtered = posts.filter(post => (post.category || '未分类') === category);
  return { props: { category, posts: filtered } };
}

export default function CategoryPage({ category, posts }) {
  return (
    <main>
      {/* <h1>分类：{category}</h1> */}
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{marginBottom:'1.2em'}}>
            <a href={`/post/${post.id}`}>{post.title}</a>
            <small style={{marginLeft:8, color:'#888'}}>{post.date?.slice(0,10)}</small>
          </li>
        ))}
      </ul>
    </main>
  );
} 