import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {useRouter} from "next/router"

export default function Home() {

const myABI = [{
    "inputs": [],
    "name": "publicPrice",
    "outputs" [
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
    "outputs" [],
    "stateMutability": "payable",
    "type": "function"
}
]

const contractAddress = "abcd"
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
    const value = ethers.BigNumber.from(tokenAmount).mul(publicPrice);
    console.log("value", value)
    const {hash} = await writeContract({
      address: contractAddress,
      abi: myABI,
      functionName: "affiliateMarketingMint",
      args: [
        affiliateAddress,
      ],
      value: BigInt(value.toString())
    })
    console.log("hash", hash)
    return null    
  }
  catch (error) {
    console.error("Error in mint:", error);
    throw (error)
  }
}

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
          Pridruzi se z mintom AnnonymousX NFTja na protokolu Arbitrum.
        </p>

        {
          mintState == 0 ? <><button class="button-7" role="button">mint</button></> : <>{
            mintState == 1 ? <>success</> : <>failed, check logs</>
          }</>
        }
        <p className="description">
          1. septembra povezava do zaprte skupine
        </p>
        <img src="/index4.png"></img>
        <p className="description">
          We are Anonymous. We are Legion. We do not forgive. We do not forget.
        </p>
      </main>
      <Footer />
    </div>
  )
}
