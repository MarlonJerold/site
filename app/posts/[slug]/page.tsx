import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { BlockMath, InlineMath } from 'react-katex';  // Importando BlockMath e InlineMath
import 'katex/dist/katex.min.css';  // Importando o CSS do KaTeX

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

  const posts = files.map((file) => {
    const filePath = path.join(process.cwd(), 'posts', file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const postData = {
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
    };

    return {
      slug: file.replace('.md', ''),
      data: postData,
      content,
    };
  });

  return posts;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <main className="mx-auto p-4 max-w-4xl">
      <h1 className="font-bold text-[2.5rem] mb-4">{post.data.title}</h1>
      <p className="text-gray-500 mb-8">{post.data.date}</p>

      {/* Usando ReactMarkdown com remark-math e react-katex */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]} // Adicionando remark-math
        components={{
          // Usando InlineMath para expressões inline
          code: ({ children, className }) => {
            const value = String(children).trim();
            if (className === 'language-inline') {
              return <InlineMath>{value}</InlineMath>;
            }
            return <pre>{children}</pre>;
          },
          // Usando BlockMath para expressões de bloco
          p: ({ children }) => {
            const value = String(children);
            // Detecta expressões matemáticas de bloco, envolvidas com $$...
            if (value.includes('$$')) {
              return <BlockMath>{value.replace('$$', '').replace('$$', '')}</BlockMath>;
            }
            return <p>{children}</p>;
          },
        }}
        className="prose"
      >
        {post.content}
      </ReactMarkdown>

      <div className="mt-8">
        <Link href="/" passHref>
          <button className="bg-[#212429] text-gray-200 py-2 px-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            Voltar para o Home
          </button>
        </Link>
      </div>
    </main>
  );
}
