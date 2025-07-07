import Link from 'next/link';
import { getAllPosts } from '../lib/aws';

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <>
      {/* <h1>极简博客</h1> */}
      <ul className="article-list">
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}><b>{post.title}</b></Link>
            <div style={{marginTop:8}}>
              <small>{post.date?.slice(0,10)}</small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
} 