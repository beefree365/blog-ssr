import Link from 'next/link';
import config from '../blog.config';
import { useRouter } from 'next/router';
import styles from '../styles/HeaderBar.module.css';

const navs = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/tags', label: '标签', icon: '🏷️' },
  { href: '/archives', label: '归档', icon: '🗃️' },
  { href: '/about', label: '关于', icon: '👤' },
];

export default function HeaderBar() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.title}>{config.nickname}</div>
      <div className={styles.desc}>{config.desc}</div>
      <nav className={styles.menu}>
        {navs.map(nav => (
          <Link key={nav.href} href={nav.href} legacyBehavior>
            <a className={router.pathname === nav.href ? styles.active : ''}>
              <span className={styles.icon}>{nav.icon}</span>
              <span>{nav.label}</span>
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
} 