import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app";
import Layout from '../components/common/Layout';
import AuthGuard from '../components/common/AuthGuard';
import { RestrictedReactFC } from '../lib/hooks';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {/* if requireAuth property is present - protect the page */}
        {(Component as RestrictedReactFC).requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} /> )}
      </Layout>
    </SessionProvider>
  );
};

export default App;

