import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {useRouter} from "next/router"
import {useState, useEffect} from "react"
import { ethers } from "ethers";
import { writeContract, readContract, getAccount } from "@wagmi/core"
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {

const myABI = [{
    "inputs": [],
    "name": "publicPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "refererAddress",
        "type": "address"
      }
    ],
    "name": "affiliateMarketingMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
]

const contractAddress = "0x92bF36144fc5924f0f5f232e8037571ea6b022e9"
async function mint() {
  try {
    const affiliateAddress = router?.query?.r || "0x87ECbA01720182f6Bd63b8576c4388DA8950fA90"
    console.log(affiliateAddress)
    const publicPrice = (await readContract({
      address: contractAddress,
      abi: myABI,
      functionName: "publicPrice",
    })).toString()
    console.log("publicPrice", publicPrice)
    const {hash} = await writeContract({
      address: contractAddress,
      abi: myABI,
      functionName: "affiliateMarketingMint",
      args: [
        affiliateAddress,
      ],
      value: BigInt(publicPrice)
    })
    console.log("hash", hash)
    return null    
  }
  catch (error) {
    console.error("Error in mint:", error);
    throw (error)
  }
}

const [price, setPrice] = useState(null);
async function loadPrice() {
  const publicPrice = (await readContract({
    address: contractAddress,
    abi: myABI,
    functionName: "publicPrice",
  })).toString()
  setPrice(publicPrice);
}

useEffect(() => {
  loadPrice();
}, []);  // An empty dependencies array ensures that the effect is run only once, after the initial render.

const router = useRouter()
const [mintState, setMintState] = useState(0)
async function mintWrapper() {
  try {
    await mint()
  } catch(err) {
    console.log(err)
    setMintState(-1)
  }
}

return (
  <div style={{textAlign: "center"}}>
    <Head>
      <title>Dobrodošli v AnonymousX Slovenija!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header title="Dobrodošli v AnonymousX Slovenija!" />
    <main>
      <section>
        <h2>O nas</h2>
        <p className="description">
          AnonymousX Slovenija je Decentralizirana Avtonomna Organizacija (DAO),<br/> ki se aktivno ukvarja z razpravami o sodobnih temah, predvsem na naslednjih področjih:
        </p>
        <ul className="topic-list">
          <li>
            Svoboda govora.
          </li>
          <li>
            Internetna varnost in anonimnost.
          </li>
          <li>
            Različne kripto teme.
          </li>
          <li>
            Bližajoča se nevarnost umetne inteligence. 
          </li>
          <li>
            Eticno hekanje.
          </li>
        </ul>
      </section>
      <section>
        <h2>Pridružite se nam</h2>
        <p className="description">
          Pridružite se nam z mintanjem AnonymousX NFT na protokolu PolygonZkEVM ({price ? ethers.utils.formatEther(price) : "?"} eth).
        </p>
        <div className="connect-button-container" style="margin: auto; width: fit-content;">
            <ConnectButton></ConnectButton>
        </div>
        {mintState === 0 ? 
          <button onClick={() => mintWrapper()} className="button-7" role="button">Mintaj</button>
          : 
          mintState === 1 ? <p>Uspešno!</p> : <p>Neuspešno, imate dovolj eth? preverite logs</p>
        }
        <a href="/help">Pomoč</a>
      </section>
      <section>
        <h2>Skupina</h2>
        <p className="description">
          1. septembra povezava do zaprte skupine
        </p>
        <img src="/index4.png" alt="AnonymousX"></img>
      </section>
      <section>
        <h2>Naše vodilo</h2>
        <p className="description">
          Smo Anonymous. Smo Legija. Ne odpuščamo. Ne pozabljamo.
        </p>
        {/* vec o nas */}
        <a href="/help">Več</a>
      </section>
    </main>
    <Footer />
  </div>
)
}
