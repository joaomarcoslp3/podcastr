import { Header, Player } from '../components'
import { PlayerContext, PlayerContextProvider } from '../providers'
import styles from '../styles/app.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
