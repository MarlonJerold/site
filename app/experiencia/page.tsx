import Header from '@/components/Header';
import Experience from '@/components/Experience'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Experience />
      <div className="mt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p> <br></br>
        </div>
    </main>
  )
}

