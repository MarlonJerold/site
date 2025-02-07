import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"
import RedesSociais from "@/components/RedesSociais"
import CodeBlock from "@/components/CodeBlock"
import { CalendarIcon, ClockIcon } from "lucide-react"

interface Post {
  slug: string
  data: {
    title: string
    description?: string
    date: string
    readingTime?: string
  }
  content: string
}

async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"))

  return files.map((file) => {
    const filePath = path.join(process.cwd(), "posts", file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      slug: file.replace(".md", ""),
      data: {
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        readingTime: data.readingTime || "5 min de leitura",
      },
      content,
    }
  })
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const posts = await getAllPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    return <div>Artigo não encontrado</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{post.data.title}</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{post.data.date}</span>
              <ClockIcon className="w-4 h-4 ml-4 mr-2" />
              <span>{post.data.readingTime}</span>
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  const value = String(children)
                  if (value.startsWith("$$") && value.endsWith("$$")) {
                    return <BlockMath>{value.slice(2, -2)}</BlockMath>
                  }
                  if (value.startsWith("$$") && value.endsWith("$$")) {
                    return <InlineMath>{value.slice(2, -2)}</InlineMath>
                  }
                  return <p className="mb-4 text-gray-700">{children}</p>
                },
                code({ className, children }) {
                  if (className && className.startsWith("language-")) {
                    return <CodeBlock code={String(children)} language={className.split("-")[1]} />
                  }
                  return <code className={`bg-gray-100 rounded px-1 py-0.5 text-sm ${className}`}>{children}</code>
                },
                h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4 text-gray-600">
                    {children}
                  </blockquote>
                ),
              }}
              className="prose max-w-none"
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link href="/">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition duration-300 ease-in-out">
              Voltar para o Home
            </button>
          </Link>
        </div>

        <section className="flex flex-col items-center justify-center space-y-6 mt-12">
          <RedesSociais />
          <p className="text-lg text-center text-gray-600 max-w-lg italic">
  &quot;O que passa na mente de um pato que escreve códigos&quot;
        </p>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default PostPage

