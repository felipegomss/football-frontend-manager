import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const CAMPSLIST = [
  {
    "area": "Brazil",
    "name": "Campeonato Brasileiro Série A",
    "code": "BSA",
    "emblem": "https://crests.football-data.org/764.svg"
  },
  {
    "area": "England",
    "name": "Championship",
    "code": "ELC",
    "emblem": "https://crests.football-data.org/ELC.png",
  },
  {
    "area": "France",
    "name": "Ligue 1",
    "code": "FL1",
    "emblem": "https://crests.football-data.org/FL1.png",
  },
  {
    "area": "Portugal",
    "name": "Primeira Liga",
    "code": "PPL",
    "emblem": "https://crests.football-data.org/PPL.png",
  },
  {
    "area": "Europe",
    "name": "UEFA Champions League",
    "code": "CL",
    "emblem": "https://crests.football-data.org/CL.png" 
  },
  {
    "area": "South America",
    "name": "Copa Libertadores",
    "code": "CLI",
    "emblem": "https://crests.football-data.org/CLI.svg"
  },
  {
    "area": "Spain",
    "name": "Primera Division",
    "code": "PD",
    "emblem": "https://crests.football-data.org/PD.png"
  },
  {
    "area": "Germany",
    "name": "Bundesliga",
    "code": "BL1",
    "emblem": "https://crests.football-data.org/BL1.png",
  },
  {
    "area": "Netherlands",
    "name": "Eredivisie",
    "code": "DED",
    "emblem": "https://crests.football-data.org/ED.png"
  },
  {
    "area": "Italy",
    "name": "Serie A",
    "code": "SA",
    "emblem": "https://crests.football-data.org/SA.png",
  },
  {
    "area": "England",
    "name": "Premier League",
    "code": "PL", 
    "emblem": "https://crests.football-data.org/PL.png",
  },
]

export default function Home() {
  const [camps, getCamps] = useState([])

  useEffect(()=> {
    getCamps(CAMPSLIST)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Football Manager</title>
        <meta name="description" content="Access to data of these leagues & cups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Football Manager
        </h1>

        <p className={styles.description}>
        Access to data of these leagues & cups.
        </p>

        <div className={styles.grid}>

        {camps.map((camp, key) => (
          <a href={`/camp/${camp.code}`} className={styles.card} key={key}>
          <Image src={camp.emblem} width={500} height={500}  alt={`${camp.name} icon`} layout="responsive"/>
            <h2>{camp.name}</h2>
            <p>{camp.area}</p>
          </a>
        ))}
         
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
}
