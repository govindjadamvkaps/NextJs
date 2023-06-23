

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container } from 'react-bootstrap'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleClick = (item) => {
    alert(item)
  }
  const innerComp = () => {
    return (

      <h5>this is a inner component</h5>

    )
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Head>
        <title>
          Next Js App
        </title>
        <meta name='description' contact="Genetated by create-next-app "></meta>
      </Head>

      <Container className='mt-5'>
        <h1> Hello this is a home  </h1>
        <button onClick={() => alert('hello')}>click me</button>
        <button onClick={() => { handleClick("hello my name is govind") }}>click me</button>
      <innerComp />
      {innerComp()}
      </Container>
    </main>
  )
}
