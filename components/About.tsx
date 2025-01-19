'use client'
import { motion } from 'framer-motion'
import { Code, Server, Coffee, Globe, Twitter, Github, Linkedin, Twitch } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre" className="py-20 mt-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image  
              src="image.png?height=300&width" 
              alt="Patinho Tech" 
              className="rounded-full w-48 h-48 object-cover mx-auto"
            />
          </motion.div>
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg mb-6 text-center md:text-left text-gray-300">
            Olá, sou Marlon, desenvolvedor de software e atualmente estagiário na @Compass UOL, atuando como DevSecOps. Estou desenvolvendo minhas habilidades em Cloud, especialmente com os serviços da AWS. Além disso, estou cursando Bacharelado em Engenharia de Software. Tenho um blog e no meu tempo livre, faço lives codificando e jogando alguns games.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Skill icon={<Server />} text="DevOps" />
              <Skill icon={<Code />} text="Back-End" />
              <Skill icon={<Coffee />} text="Java Enthusiast" />
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialIcon href="https://blog.marlonjerold.com" icon={<Globe />} label="Blog" />
              <SocialIcon href="https://twitter.com/patinhotech" icon={<Twitter />} label="Twitter" />
              <SocialIcon href="https://bsky.app/profile/patinhotech.bsky.social" icon={<Globe />} label="Bluesky" />
              <SocialIcon href="https://twitch.tv/patinhotech" icon={<Twitch />} label="Twitch" />
              <SocialIcon href="https://github.com/MarlonJerold" icon={<Github />} label="GitHub" />
              <SocialIcon href="https://linkedin.com/in/marlon-jerold" icon={<Linkedin />} label="LinkedIn" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Skill({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <motion.div 
      className="flex items-center justify-center md:justify-start"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-blue-400 mr-2">{icon}</span>
      <span>{text}</span>
    </motion.div>
  )
}

function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="text-gray-300 hover:text-blue-400"
      title={label}
    >
      {icon}
    </motion.a>
  )
}

