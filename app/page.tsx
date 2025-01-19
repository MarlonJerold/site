import Header from '@/components/Header';
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Streaming from '@/components/Streaming'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <About />
      <Projects />
      <Streaming />
      <Experience />
    </main>
  )
}

