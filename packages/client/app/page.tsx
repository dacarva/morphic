import ApiTestForm from '@/components/ApiTestForm'
import { Profile } from '@/components/Profile'
import { ArrowDownIcon } from '@radix-ui/react-icons'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 gradient">
      <header className="text-center space-y-5">
        <h1 className="text-7xl font-bold ">Morphic</h1>
        <h2 className="text-3xl max-w-4xl text-center text-gray-300 ">
          Unlocking Financial Access with{' '}
          <span className="font-bold italic text-white">Secure</span> and{' '}
          <span className="font-bold italic text-white">
            Hybrid Credit Scores
          </span>{' '}
          for a Global Economy.
        </h2>
      </header>

      <div className="flex gap-3 items-center opacity-85">
        <div className="scale-150 mt-2">
          <ArrowDownIcon className="animate-bounce scale-125" />
        </div>{' '}
        <p className="text-lg opacity-90">Try out</p>
        <div className="scale-150 mt-2">
          <ArrowDownIcon className="animate-bounce scale-125" />
        </div>{' '}
      </div>

      <ApiTestForm />
      {/* <Profile /> */}
    </main>
  )
}
