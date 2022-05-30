import Head from 'next/head'
import Navbar from './Navbar'

// export default ({ children: React.FC }) => {
const Layout: React.FC<any> = (props) => {
  return (
    <div className="container is-fullheight">
      <Head>
        <title>Next Typescript</title>
        <meta name="Crystal Index" content="An Index of Crystals" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
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

