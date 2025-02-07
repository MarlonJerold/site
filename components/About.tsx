"use client"
import { motion } from "framer-motion"
import { Code, Server, Coffee, Globe, Twitter, Github, Linkedin, Twitch } from "lucide-react"
import type React from "react" 

export default function About() {
  return (
    <section id="sobre" className="py-20 mt-16">
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Sobre Mim
        </motion.h2>
        <motion.div
          className="mx-auto md:w-2/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-6 text-gray-600">
            Olá, me chamo Marlon, sou desenvolvedor de software com foco em Cloud e Serviços da AWS. Atualmente
            cursando Bacharelado em Engenharia de Software e estagiando como DevSecOps na Compass UOL.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skill icon={<Server className="text-blue-600" />} text="DevOps" />
            <Skill icon={<Code className="text-blue-600" />} text="Back-End" />
            <Skill icon={<Coffee className="text-blue-600" />} text="Java Enthusiast" />
          </div>
          <div className="flex justify-center space-x-4">
            <SocialIcon href="https://twitter.com/patinhotech" icon={<Twitter />} label="Twitter" />
            <SocialIcon href="https://bsky.app/profile/patinhotech.bsky.social" icon={<Globe />} label="Bluesky" />
            <SocialIcon href="https://twitch.tv/patinhotech" icon={<Twitch />} label="Twitch" />
            <SocialIcon href="https://github.com/MarlonJerold" icon={<Github />} label="GitHub" />
            <SocialIcon href="https://linkedin.com/in/marlon-jerold" icon={<Linkedin />} label="LinkedIn" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Skill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div className="flex items-center justify-center" whileHover={{ scale: 1.05 }}>
      <span className="mr-2">{icon}</span>
      <span className="text-gray-700">{text}</span>
    </motion.div>
  )
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="text-gray-600 hover:text-blue-600"
      title={label}
    >
      {icon}
    </motion.a>
  )
}
