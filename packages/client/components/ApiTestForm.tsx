'use client'

import { promptCreator } from '@/app/utils/PromptCreator'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  useAccount,
  useConfig,
  useConnect,
  useWriteContract,
  type Config,
  useConnectorClient,
} from 'wagmi'
import { getConnectorClient } from '@wagmi/core'
import { useToast } from '@/hooks/use-toast'
import { abi } from '@/assets/abi/GaladrielAbi'
import { BrowserProvider, Contract, ethers, JsonRpcSigner, N } from 'ethers'
import type { Account, Chain, Client, Transport } from 'viem'

export default function ApiTestForm() {
  const { writeContractAsync } = useWriteContract()
  const config = useConfig()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [documentNumber, setDocumentNumber] = useState('')
  const [responseReport, setResponseReport] = useState('')
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const fetchUserData = async (e: React.FormEvent) => {
    try {
      setIsLoading(true)
      console.log('on fetchUserData')
      console.log(documentNumber)

      e.preventDefault()
      if (!documentNumber) {
        setResponseReport('Document number is required')
        return
      }
      const res = await fetch('/api/userReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentNumber }),
      })

      const data = await res.json()
      console.log(data)
      const stringifiedData = JSON.stringify(data)
      console.log('points are', stringifiedData)

      const newPrompt = promptCreator(stringifiedData)
      console.log('newprompt is ', newPrompt)

      const signer = await getEthersSigner(config)

      const chatContract = new Contract(
        '0x744Feb93d29C2699bAEAD2F34A72FcBB5b5550bA',
        abi,
        signer,
      )

      const tx = await chatContract.startChat(newPrompt)

      console.log('tx is ', tx)

      // const hash = await writeContractAsync({
      //   abi,
      //   address: '0x744Feb93d29C2699bAEAD2F34A72FcBB5b5550bA',
      //   functionName: 'startChat',
      //   args: ['hola'],
      // })

      // const receipt = await waitForTransactionReceipt(config, { hash })

      // const logs = parseEventLogs({
      //   logs: receipt.logs,
      //   abi,
      //   eventName: 'ChatCreated',
      // })

      // console.log(logs)

      // toast({
      //   title: 'Coefficients',
      //   description: JSON.stringify(responseValues),
      // })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Get Hybrid Credit Score</CardTitle>
          <CardDescription>
            {isConnected
              ? 'Type in your id to get your credit score.'
              : 'Log in to get started.'}
          </CardDescription>
        </CardHeader>
        {isConnected ? (
          <form onSubmit={fetchUserData}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Id</Label>
                  <Input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Enter User ID"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get Score'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="flex justify-center">
            <Button
              className="mt-5"
              onClick={() => connect({ connector: connectors[0] })}
            >
              Log in
            </Button>
          </CardContent>
        )}
      </Card>

      {responseReport && (
        <p className="text-center mt-5 text-blue-600">{responseReport}</p>
      )}
    </div>
  )
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {},
) {
  const client = await getConnectorClient(config, { chainId })
  return clientToSigner(client)
}
