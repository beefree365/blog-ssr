import { getAllPosts } from '../lib/aws';

function groupByYear(posts) {
  const map = {};
  posts.forEach(post => {
    const year = (post.date || '').slice(0, 4) || '未知';
    if (!map[year]) map[year] = [];
    map[year].push(post);
  });
  return map;
}

export async function getServerSideProps() {
  const posts = await getAllPosts();
  const yearMap = groupByYear(posts);
  return { props: { yearMap } };
}

export default function Archives({ yearMap }) {
  return (
    <>
      {/* <h1>归档</h1> */}
      <ul>
        {Object.entries(yearMap).sort((a, b) => b[0].localeCompare(a[0])).map(([year, posts]) => (
          <li key={year} style={{marginBottom:'2em'}}>
            <span className="archive-year">{year}</span> <span style={{color:'#888'}}>({posts.length})</span>
            <ul style={{marginTop:12}}>
              {posts.map(post => (
                <li key={post.id}>
                  <a href={`/post/${post.id}`}>{post.title} <span style={{color:'#aaa',fontSize:'0.95em'}}>{post.date?.slice(0,10)}</span></a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
} 