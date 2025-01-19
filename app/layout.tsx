import './globals.css'
import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'

const atkinson = Atkinson_Hyperlegible({ 
  subsets: ['latin'], 
  weight: ['400', '700'] // Definindo os pesos que você deseja importar
})

export const metadata: Metadata = {
  title: 'Marlon',
  description: 'site do Marlon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${atkinson.className} bg-gray-1000 text-gray-300`}>
        {children}
      </body>
    </html>
  )
}
