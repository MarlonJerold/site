import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ContentItem {
  type: "tutorial";
  title: string;
  description?: string;
  date: string;
  link: string;
}

async function getAllPosts(): Promise<ContentItem[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  const posts = files.map((file) => {
    const filePath = path.join(process.cwd(), 'posts', file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      type: 'tutorial' as const, 
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      link: `/posts/${file.replace('.md', '')}`,  
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.link.replace('/posts/', ''),
  }));
}

const Streaming = async () => {
  const posts = await getAllPosts();

  return (
    <section id="postagens" className="py-20 mt-16 text-white">
      <div className="container mx-auto px-4 max-w-full lg:max-w-4xl xl:max-w-5xl">
        <div className="grid grid-cols-1 gap-6">
          {posts.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-gray-500 mb-3">{item.title}</h3>
              <p className="text-gray-400 mb-3">{item.description}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
              <a
                href={item.link}
                className="mt-4 inline-block text-indigo-300 hover:text-indigo-400 transition-colors duration-300"
              >
                Ver post
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Streaming;