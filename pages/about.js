import config from '../blog.config';

export default function About() {
  return (
    <>
      <h1 style={{textAlign:'center'}}>关于我</h1>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        <div dangerouslySetInnerHTML={{ __html: config.about }} />
      </div>
    </>
  );
} 