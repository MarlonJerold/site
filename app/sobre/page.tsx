import Header from '@/components/Header';
import About from '@/components/About'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <About />
      <div className="mt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p> <br></br>
        </div>
    </main>
    
  )
}

