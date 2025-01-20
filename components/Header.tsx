'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const navItems: { label: string, href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Experiência', href: '/experiencia' },
  ];

  return (
    <motion.header 
      className="bg-[#212429] shadow-lg fixed top-0 left-0 w-full z-20" 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-full lg:max-w-4xl xl:max-w-5xl">
        <motion.h1 
          className="text-2xl font-bold text-[#c9c9c9]"
          whileHover={{ scale: 1.05 }}
        >
          Marlon Jerold
        </motion.h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                <Link href={item.href} className="text-gray-400 hover:text-[#6f6f6f]">
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="text-gray-300" /> : <Menu className="text-gray-300" />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.nav 
          className="md:hidden bg-[#212429]" 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul className="flex flex-col items-center py-4">
            {navItems.map((item, index) => (
              <motion.li key={index} className="py-2">
                <Link 
                  href={item.href} 
                  className="text-gray-400 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  )
}
