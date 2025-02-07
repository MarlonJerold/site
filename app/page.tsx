import Header from '@/components/Header';
import Streaming from '@/components/Streaming'
import About from '@/components/About';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <About />
      <Streaming />
      <section className="flex flex-col items-center justify-center min-h-[50vh]  space-y-6">
  <p className="text-lg text-center text-[#c9c9c9] max-w-lg">
    O que passa na mente de um pato que escreve códigos
  </p>
</section>
    </main>
  )
}

