import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import RedesSociais from "@/components/RedesSociais";
import Header from "@/components/Header";
import CodeBlock from "@/components/CodeBlock";

interface Post {
  slug: string;
  data: {
    title: string;
    description?: string;
    date: string;
  };
  content: string;
}

async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  return files.map((file) => {
    const filePath = path.join(process.cwd(), 'posts', file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug: file.replace('.md', ''),
      data: {
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
      },
      content,
    };
  });
}

// Novo método para gerar parâmetros estáticos com base no slug
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Alteração de `getStaticProps` para busca direta dentro do componente
const PostPage = async ({ params }: { params: { slug: string } }) => {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <main className="mx-auto p-4 max-w-4xl">
      <Header />
      <div className="mb-8">
        <h1 className="font-bold text-[2.5rem] mb-4">{post.data.title}</h1>
        <p className="text-gray-500">Publicado em: {post.data.date}</p>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            const value = String(children);
            if (value.startsWith("$$") && value.endsWith("$$")) {
              return <BlockMath>{value.slice(2, -2)}</BlockMath>;
            }
            if (value.startsWith("\\(") && value.endsWith("\\)")) {
              return <InlineMath>{value.slice(2, -2)}</InlineMath>;
            }
            return <p>{children}</p>;
          },
          code({ className, children }) {
            if (className && className.startsWith('language-')) {
              return <CodeBlock code={String(children)} language={className.split('-')[1]} />;
            }
            return <code className={className}>{children}</code>;
          },
        }}
        className="prose prose-invert max-w-none"
      >
        {post.content}
      </ReactMarkdown>

      <div className="mt-8 text-center">
        <Link href="/">
          <button className="bg-[#212429] text-gray-200 py-2 px-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            Voltar para o Home
          </button>
        </Link>
      </div>

      <section className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 mt-8">
        <RedesSociais />
        <p className="text-lg text-center text-[#c9c9c9] max-w-lg">
          O que passa na mente de um pato que escreve códigos
        </p>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Marlon Jerold. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
};

export default PostPage;
