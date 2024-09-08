'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { fhenixHelium, galadrielDevnet } from '../chains'
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base'
import { Web3Auth } from '@web3auth/modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Chain } from 'viem'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'

const CHAINS: readonly [Chain, ...Chain[]] = [galadrielDevnet, fhenixHelium]

export default function Providers({ children }: { children: React.ReactNode }) {
  const name = 'Morphic'

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + CHAINS[0].id.toString(16),
    rpcTarget: CHAINS[0].rpcUrls.default.http[0],
    displayName: CHAINS[0].name,
    tickerName: CHAINS[0].nativeCurrency?.name,
    ticker: CHAINS[0].nativeCurrency?.symbol,
    blockExplorerUrl: CHAINS[0].blockExplorers?.default.url[0] as string,
  }

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  })

  const web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
    chainConfig,
    privateKeyProvider,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    uiConfig: {
      appName: name,
      loginMethodsOrder: ['google', 'github'],
    },
  })

  const queryClient = new QueryClient()

  const config = createConfig({
    chains: CHAINS,
    transports: {
      [galadrielDevnet.id]: http(),
      [fhenixHelium.id]: http(),
    },
    connectors: [
      Web3AuthConnector({
        web3AuthInstance,
      }),
    ],
  })

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
