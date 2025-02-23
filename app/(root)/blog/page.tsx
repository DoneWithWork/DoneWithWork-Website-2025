import { Blog } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
const getBlogs = async () => {
  const query = `
  *[_type=="blog"] | order(created_at){
    _id,
      title,
      description,
      created_at,
      image,
      slug,
      icon,
      estimated_reading_time,
      category,
      content,
  }`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
};
export const revalidate = 3600;
const Blogs = async () => {
  const data = await getBlogs();
  return (
    <div>
      <section>
        <h1 className="headings mb-10">Blogs</h1>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
        {data.map((blog: Blog) => {
          return (
            <div key={blog._id}>
              <Link
                href={`/blog/${blog.slug?.current}`}
                className="flex flex-row  gap-2 mb-2 group "
              >
                <p className="text-2xl md:text-3xl">{blog.icon}</p>
                <p className="text-2xl md:text-3xl font-semibold group-hover:text-blue-400">
                  {blog.title}
                </p>
              </Link>

              <Image
                src={blog.image ? urlFor(blog.image).url() : ""}
                alt={blog.title || ""}
                width={1200}
                height={800}
                className="object-cover aspect-video rounded-xl shadow-sm shadow-blue-300"
              />
              <p className="text-base leading-relaxed mt-2 text-gray-200">
                <span>{blog.created_at}</span>{" "}
                <span className="font-bold mx-1">•</span>{" "}
                <span>🕔 {blog.estimated_reading_time} mins</span>{" "}
                <span className="font-bold mx-1">•</span>{" "}
                <span>{blog.category?.toUpperCase()}</span>
              </p>
              <p className="text-base">{blog.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
