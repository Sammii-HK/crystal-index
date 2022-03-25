import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'

// const Home: NextPage<HomeProps> = (props) => {
const Home: NextPage = () => {
  return (
    <div className="{styles.container}">
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Crystal Index 🌈</h1>
      </main>
    </div>
  )
}

export default Home
