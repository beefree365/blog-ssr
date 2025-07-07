import Link from 'next/link';
import styles from '../styles/Layout.module.css';
import config from '../blog.config';
import { useRouter } from 'next/router';
import HeaderBar from './HeaderBar';

const navs = [
  { href: '/', label: '首页' },
  { href: '/categories', label: '分类' },
  { href: '/tags', label: '标签' },
  { href: '/archives', label: '归档' },
  { href: '/about', label: '关于' },
];

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <HeaderBar />
      <main style={{maxWidth:820,margin:'0 auto',background:'#fff',borderRadius:12,boxShadow:'0 4px 24px rgba(0,0,0,0.07)',padding:'38px 38px 56px 38px',minHeight:'80vh',marginBottom:48}}>
        {children}
      </main>
    </>
  );
} 