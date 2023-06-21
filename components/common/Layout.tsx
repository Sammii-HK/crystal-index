import Head from 'next/head';
import Navbar from './Navbar'

// export default ({ children: React.FC }) => {
const Layout: React.FC<any> = (props) => {
  return (
    <div className="container is-fullheight">
      <Head>
        <title>The Crystal Index</title>
        <meta name="The Crystal Index" content="An Index of Crystals" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       {/* <Navbar /> */}
//       <body>{children}</body>
//     </html>
//   )
// }

