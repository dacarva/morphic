import { type Chain } from 'viem'

export const galadrielDevnet = {
  id: 696969,
  name: 'Galadriel Devnet',
  nativeCurrency: { name: 'Galadriel', symbol: 'GAL', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://devnet.galadriel.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Galadriel Devnet Explorer',
      url: 'https://explorer.galadriel.com',
    },
  },
} as const satisfies Chain

export const fhenixHelium = {
  id: 8008135,
  name: 'Fhenix Helium',
  nativeCurrency: { name: 'Fhenix', symbol: 'tFHE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.helium.fhenix.zone'] },
  },
  blockExplorers: {
    default: {
      name: 'Fhenix Helium Explorer',
      url: 'https://explorer.galadriel.com',
    },
  },
} as const satisfies Chain
