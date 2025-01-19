import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '700'] })

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
      <body className={`${roboto.className} bg-gray-900 text-gray-300`}>{children}</body>
    </html>
  )
}

