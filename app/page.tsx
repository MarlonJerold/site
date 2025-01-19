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
      <Streaming />
      <Projects />
      <Experience />
      <div className="mt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p> <br></br>
        </div>
    </main>
  )
}

