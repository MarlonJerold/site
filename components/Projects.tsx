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
    <section id="projetos" className="py-20 mt-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-blue-400"
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
      className="bg-gray-800 text-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
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
          <ExternalLink className="mr-2" />
          Ver projeto
        </a>
      </div>
    </motion.div>
  )
}
