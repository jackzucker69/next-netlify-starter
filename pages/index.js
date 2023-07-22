import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Pozdravljeni v AnnonymousX Slovenija!" />
        <p className="description">
          AnnonymousX Slovenija je Decentralizira Avtonomna Organizacija (DAO).
        </p>
        <p className="description">
          Organizacija bo aktivno razpravljala sodobne tematike, predvsem na naslednih podrocjih:
          <ul>
            <li>
              Svoboda govora.
            </li>
            <li>
              Internetna varnost in anonimnost.
            </li>
            <li>
              Razne Crypto teme.
            </li>
            <li>
              Blizanje nevarnost umetne inteligence. 
            </li>
            <li>
              Eticno hackanje.
            </li>
          </ul>
        </p>
        <p className="description">
          Pridruzi se z mintom AnnonymousX NFTja na protokolu zkSync.
        </p>
        <p className="description">
          1. septembra povezava do zaprte skupine
        </p>
        <p className="description">
          We are Anonymous. We are Legion. We do not forgive. We do not forget.
        </p>
      </main>
      <Footer />
    </div>
  )
}
