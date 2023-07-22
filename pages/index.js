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
          Organizacija bo aktivno razpravljala sodobne tematike, predvsem na podrocju svobode govora, internetne varnosti in anonimnosti, crypto, razvoj umetne inteligence in varne uporabe. 
        </p>
        <p className="description">
          Trenutno zbiramo prijave, ki so mozne z mintom AnnonymousX NFTja na protokolu zkSync.
        </p>
        <p className="description">
          1. septembra se bo na spletni strani pojavila povezava do novo odprte discord skupine, ki bo bo vodena kot DAO.
          Lastniki AnnonymousX nftja pa bodo lahko glasovali smer skupine.
        </p>
        <p className="description">
          We are Anonymous. We are Legion. We do not forgive. We do not forget.
        </p>
      </main>
      <Footer />
    </div>
  )
}
