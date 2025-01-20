'use client'
import { motion } from 'framer-motion'
import { Globe, Twitter, Github, Linkedin, Twitch } from 'lucide-react'

export default function RedesSociais() {
  const socialLinks = [
    { href: "https://blog.marlonjerold.com", icon: <Globe />, label: "Blog" },
    { href: "https://twitter.com/patinhotech", icon: <Twitter />, label: "Twitter" },
    { href: "https://twitch.tv/patinhotech", icon: <Twitch />, label: "Twitch" },
    { href: "https://github.com/MarlonJerold", icon: <Github />, label: "GitHub" },
    { href: "https://linkedin.com/in/marlon-jerold", icon: <Linkedin />, label: "LinkedIn" },
  ]

  return (
    <div className="flex justify-center items-center space-x-3">
      {socialLinks.map((link, index) => (
        <SocialIcon key={index} href={link.href} icon={link.icon} label={link.label} />
      ))}
    </div>
  )
}

function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="text-gray-300 hover:text-[#6f6f6f]"
      title={label}
    >
      {icon}
    </motion.a>
  )
}
