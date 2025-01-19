'use client'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

// Definindo o tipo das experiências
interface ExperienceType {
  title: string;
  company: string;
  period: string;
  description: string;
}

const experiences: ExperienceType[] = [
  {
    title: "DevSecOps",
    company: "Compass UOL",
    period: "nov 2024 - presente",
    description: "Implementação de soluções utilizando AWS"
  },
  {
    title: "Desenvolvedor Java",
    company: "RV2 MEIOS DE PAGAMENTOS",
    period: "set 2023 - dez 2023",
    description: "Desenvolvimento com Java, JSF, JPA/Hibernate, e Flutter"
  },
  {
    title: "Analista de qualidade de software",
    company: "FitBank 450",
    period: "mai 2022 - jun 2023",
    description: "Garantia de qualidade em transações bancárias, testes e documentação"
  }
]

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 mt-16">
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-[#c9c9c9]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Experiência Profissional
        </motion.h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  experience: ExperienceType;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div 
      className="bg-[#212429] rounded-2xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-2">
          <Briefcase className="text-[#313b4b] mr-2" />
          <h3 className="text-xl font-semibold text-gray-100">{experience.title}</h3>
        </div>
        <p className="text-gray-300 mb-1">{experience.company}</p>
        <p className="text-gray-400 text-sm mb-2">{experience.period}</p>
        <p className="text-gray-300">{experience.description}</p>
      </div>
    </motion.div>
  )
}
