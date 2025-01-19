'use client'
import { motion } from 'framer-motion'
import { GitBranch, Star } from 'lucide-react'

interface Contribution {
  project: string;
  description: string;
  stars: number;
  forks: number;
}

const contributions: Contribution[] = [
  {
    project: "Spring Framework",
    description: "Melhoria de performance em processamento assíncrono",
    stars: 1500,
    forks: 300
  },
  {
    project: "Hibernate ORM",
    description: "Novo recurso para otimização de consultas",
    stars: 800,
    forks: 150
  },
  {
    project: "Apache Kafka",
    description: "Correção de bug crítico no processamento de mensagens",
    stars: 2000,
    forks: 400
  }
]

export default function OpenSource() {
  return (
    <section id="opensource" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contribuições Open Source
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((contribution, index) => (
            <ContributionCard key={index} contribution={contribution} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ContributionCardProps {
  contribution: Contribution;
  index: number;
}

function ContributionCard({ contribution, index }: ContributionCardProps) {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">{contribution.project}</h3>
        <p className="text-gray-300 mb-4">{contribution.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" />
            <span>{contribution.stars}</span>
          </div>
          <div className="flex items-center">
            <GitBranch className="text-blue-400 mr-1" />
            <span>{contribution.forks}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
