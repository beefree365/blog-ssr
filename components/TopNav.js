import Link from 'next/link';
import styles from '../styles/TopNav.module.css';
import config from '../blog.config';
import { useRouter } from 'next/router';
import { useState } from 'react';

const navs = [
  { href: '/', label: '首页' },
  { href: '/categories', label: '分类' },
  { href: '/tags', label: '标签' },
  { href: '/archives', label: '归档' },
  { href: '/about', label: '关于' },
];

export default function TopNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>{config.nickname}</Link>
        <nav className={open ? styles.menuOpen : styles.menu}>
          {navs.map(nav => (
            <Link key={nav.href} href={nav.href} legacyBehavior>
              <a className={router.pathname === nav.href ? styles.active : ''}>{nav.label}</a>
            </Link>
          ))}
        </nav>
        <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
          <span className={styles.menuIcon}></span>
        </button>
      </div>
    </header>
  );
} 