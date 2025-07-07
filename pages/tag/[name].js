import { getAllPosts } from '../../lib/aws';

export async function getServerSideProps({ params }) {
  const posts = await getAllPosts();
  const tag = params.name;
  const filtered = posts.filter(post => (post.tags || []).includes(tag));
  return { props: { tag, posts: filtered } };
}

export default function TagPage({ tag, posts }) {
  return (
    <div>
      <h1>{tag}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/post/${post.id}`}>{post.title}</a>
            <small style={{marginLeft:8, color:'#888'}}>{post.date?.slice(0,10)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
} 