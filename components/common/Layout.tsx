import Head from 'next/head'
import { Metadata } from 'next'
import Navbar from './Navbar'

export const metadata: Metadata = {
  title: {
    default: 'The Crystal Index',
    template: '%s | The Crystal Index',
  },
  description: 'The most personal, beautiful and informative way to discover crystal meanings and index your crystal collection.'
}

// export default ({ children: React.FC }) => {
const Layout: React.FC<any> = (props) => {
  return (
    <div className="container is-fullheight">
      <Head>
        <title>The Crystal Index, the most personal, beautiful and informative way to index your crystal collection.</title>
        <meta name="The Crystal Index" content="An Index of Crystals" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
      </Head>

      <Navbar />

      {props.children}
      
      {/* <footer className="footer">
        <div className="content has-text-centered">
          <span>I'm the footer</span>
        </div>
      </footer> */}
    </div>
  )
}

export default Layout;

