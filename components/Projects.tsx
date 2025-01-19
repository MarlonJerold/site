'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Milho News",
    description: "Milho News é um portal diário open-source que reúne as principais novidades, tendências, discussões e oportunidades na Bluesky para desenvolvedores brasileiros. Oferece resumos diretos e práticos para manter você atualizado sobre o que realmente importa no universo dev.",
    tech: ["Java", "Spring Boot", "Python", "JavaScript", "Docker", "Gemini", "React"],
    link: "https://milho.site"
  }
]

export default function Projects() {
  return (
    <section id="projetos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Projetos
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <span key={techIndex} className="bg-blue-900 text-blue-200 text-xs font-semibold px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={project.link} 
          className="inline-flex items-center text-blue-400 hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver projeto <ExternalLink className="ml-1 w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}
