import Header from '@/components/Header';
import Streaming from '@/components/Streaming'
import About from '@/components/About';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <About />
      <Streaming />
    </main>
  )
}

