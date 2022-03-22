import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import Navbar from '../components/common/Navbar';

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Typescript</title>
        <meta name="Crystal Index" content="An Index of Crystals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Crystal Index 🌈</h1>
      </main>
    </div>
  )
}

export default Home

type HomeProps = {
  users: User[]
}


export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};