'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  navItems: string[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const navItems = ['Sobre', 'Projetos', 'Experiência', 'Streaming'];

  return (
    <motion.header 
      className="bg-gray-900 shadow-lg fixed w-full z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold text-blue-500"
          whileHover={{ scale: 1.05 }}
        >
          Marlon Jerold
        </motion.h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                <a href={`#${item.toLowerCase().replace('ê', 'e')}`} className="text-gray-400 hover:text-blue-500">
                  {item}
                </a>
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
          className="md:hidden bg-gray-900"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul className="flex flex-col items-center py-4">
            {navItems.map((item, index) => (
              <motion.li key={index} className="py-2">
                <a 
                  href={`#${item.toLowerCase().replace('ê', 'e')}`} 
                  className="text-gray-400 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  )
}
