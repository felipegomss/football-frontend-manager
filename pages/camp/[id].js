import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Camp({params}) {
  const {id} = params;
  const [competition, setCompetition] = useState({})
  const [scores, setScores] = useState({})
  const [matches, setMatches] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      const fetchData = async () =>{
        const reqCamp = await axios.get(`https://fut-api-competitions.herokuapp.com/services/standing/${id}/ab6af7523cac401396e5411082096f67`)
        const resCamp = reqCamp.data
        const reqScore = await axios.get(`https://fut-api-competitions.herokuapp.com/services/topscorers/${id}/ab6af7523cac401396e5411082096f67`)
        const resScore = reqScore.data.scorers
        const reqMatches = await axios.get(`https://fut-api-competitions.herokuapp.com/services/matches/${id}/ab6af7523cac401396e5411082096f67`)
        const resMatches = reqMatches.data.matches
        const matchesRev = resMatches.reverse()
        setMatches(matchesRev)
        setScores(resScore)
        setCompetition(resCamp)
      }
      fetchData();
  },[])
  useEffect(()=>{
    function isEmpty(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
          setLoading(false)
          return false;
        }
        
        setLoading(true)
      return true;
  }
  isEmpty(competition)
  console.log(loading)
  }, [competition])

  Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{id} | Football Manager</title>
        <meta name="description" content="Access to data of these leagues & cups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {loading === true ? <p>Loading...</p>
    :
    <main className={styles.main}>
      <h1 className={styles.title}>
        {competition.competition.name}
      </h1>
      <div className={styles.table}>

        <header className={styles.tableLine}>
          <p></p>
          <p>Clube</p>
          <p>PJ</p>
          <p>PG</p>
          <p>V</p>
          <p>E</p>
          <p>D</p>
          <p>SG</p>
          <p>GP</p>
          <p>GC</p>
        </header>

        {competition.standings[0].table.map((team, key)=>(
          <div className={styles.tableLine} key={key}>
          <p>{key + 1}</p>
          <p>{team.team.shortName}</p>
          <p>{team.playedGames}</p>
          <p>{team.points}</p>
          <p>{team.won}</p>
          <p>{team.draw}</p>
          <p>{team.lost}</p>
          <p>{team.goalDifference}</p>
          <p>{team.goalsFor}</p>
          <p>{team.goalsAgainst}</p>
        </div>
        ))}
      </div>
      <div className={styles.table}>
      <h2 className={styles.subtitle}>
        Artilheiros
      </h2>
      <header className={styles.tableScore}>
          <p>Jogador</p>
          <p>Time</p>
          <p>Gols</p>
          <p>Gols Pênaltis</p>
        </header>
        {
          scores.map((player, key) => (
            <div className={styles.tableScore} key={key}>
                <p>{player.player.name}</p>
                <p>{player.team.name}</p>
                <p>{player.goals}</p>
                <p>{player.penalties}</p>
          </div>
          ))
        }
      </div>  

      <div className={styles.table}>
      <h2 className={styles.subtitle}>
        Partidas
      </h2>
      <header className={styles.tableMatch}>
          <p>Data</p>
          <p>Casa</p>
          <p></p>
          <p></p>
          <p></p>
          <p>Fora</p>
          <p>Rodada</p>
        </header>
        { 
          matches.map((match, key) => {
            var utc = new Date(match.utcDate)

            return(
            <div className={styles.tableMatch} key={key}>
                <p>{utc.customFormat( "#DD#/#MM#/#YYYY# #hhhh#:#mm#" )}</p>
                <p>{match.homeTeam.shortName}</p>
                <p>{match.score.fullTime.home}</p>
                <p>X</p>
                <p>{match.score.fullTime.away}</p>
                <p>{match.awayTeam.shortName}</p>
                <p>{match.matchday}</p>

          </div>
          )}
          )
        }
      </div>  
    </main>
}
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

export function getServerSideProps(context) {
  return {
    props: {params: context.params}
  };
}

