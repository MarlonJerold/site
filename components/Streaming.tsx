import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ContentItem {
  type: "tutorial"
  title: string
  description?: string
  date: string
  link: string
}

async function getAllPosts(): Promise<ContentItem[]> {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"))

  const posts = files.map((file) => {
    const filePath = path.join(process.cwd(), "posts", file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContent)

    return {
      type: "tutorial" as const,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      link: `/posts/${file.replace(".md", "")}`,
    }
  })

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.link.replace("/posts/", ""),
  }))
}

const Streaming = async () => {
  const posts = await getAllPosts()

  return (
    <section id="postagens" className="py-20 mt-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Últimas Postagens</h2>
        <div className="grid grid-cols-1 gap-8">
          {posts.map((item, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
              {item.description && <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>}
              <Link
                href={item.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Ler mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Streaming

