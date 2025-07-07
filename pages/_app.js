import '../styles/globals.css';
import '../styles/Layout.module.css';
import '../styles/HeaderBar.module.css';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
} 