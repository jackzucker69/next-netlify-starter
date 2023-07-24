import '@styles/globals.css'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider,} from "@rainbow-me/rainbowkit";
import { connectorsForWallets} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonZkEvm } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

let chain = polygonZkEvm;

const { chains, publicClient } = configureChains(
  [chain],
  [
    //alchemyProvider({ apiKey: "" }),
    publicProvider()
  ]
);
const appName = "asdf";
const projectId = "asdf";
const { wallets: walletGroups } = getDefaultWallets({
  appName: appName,
  projectId: projectId,
  chains,
});
const connectors = connectorsForWallets(walletGroups);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function Application({ Component, pageProps }) {
  return <>
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
    </RainbowKitProvider>
    </WagmiConfig>
  </>
}

export default Application
