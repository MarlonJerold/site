import Header from '@/components/Header';
import Streaming from '@/components/Streaming'
import RedesSociais from '@/components/RedesSociais';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Streaming />
      <section className="flex flex-col items-center justify-center min-h-[50vh]  space-y-6">
  <RedesSociais />
  <p className="text-lg text-center text-[#c9c9c9] max-w-lg">
    O que passa na mente de um pato que escreve códigos
  </p>
</section>
      <div className="mt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p> <br></br>
        </div>
    </main>
  )
}

