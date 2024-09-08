import ApiTestForm from '@/components/ApiTestForm'
import { Profile } from '@/components/Profile'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-7xl font-bold ">Morphic</h1>
      <h2 className="text-3xl max-w-4xl text-center">
        Unlocking Financial Access with{' '}
        <span className="font-bold italic">Secure</span> and{' '}
        <span className="font-bold italic">Hybrid Credit Scores</span> for a
        Global Economy.
      </h2>
      <ApiTestForm />
      <Profile />
    </main>
  )
}
