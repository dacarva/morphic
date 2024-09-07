import ApiTestForm from '@/components/ApiTestForm'
import { Profile } from '@/components/Profile'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold mb-10">Morphic</h1>
      <ApiTestForm />
      <Profile />
    </main>
  )
}
