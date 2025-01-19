'use client'
import { motion } from 'framer-motion'
import { Play, Book } from 'lucide-react'

interface ContentItem {
  type: "tutorial" | "stream";
  title: string;
  description: string;
  link: string;
}

const content: ContentItem[] = [
  {
    type: "tutorial",
    title: "Caminhos para entender a AWS",
    description: "Caminhos iniciais para entender AWS",
    link: "https://youtube.com/patinhotech"
  },
  {
    type: "tutorial",
    title: "Caminhos para ser Desenvolvedor Java",
    description: "Caminhos iniciais para entender sobre Java",
    link: "https://youtube.com/patinhotech"
  }
]

export default function Streaming() {
  return (
    <section id="postagens" className="py-20 mt-16 "> {/* Alteração para bg-white */}
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item, index) => (
            <ContentCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

function ContentCard({ item, index }: ContentCardProps) {
  return (
    <motion.div 
      className="bg-[#212429] rounded-2xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          {item.type === "stream" ? (
            <Play className="text-red-500 mr-2" />
          ) : (
            <Book className="text-green-500 mr-2" />
          )}
          <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
        </div>
        <p className="text-gray-300 mb-4">{item.description}</p>
        <a 
          href={item.link} 
          className="inline-flex items-center text-blue-400 hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.type === "stream" ? "Assistir stream" : "ver blog/post"}
        </a>
      </div>
    </motion.div>
  )
}
