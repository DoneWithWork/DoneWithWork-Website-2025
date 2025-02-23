import { Blog } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamicParams = true;
const getBlog = async () => {
  const query = `
 *[_type=="blog"] | order(created_at){
   _id,
     title,
     description,
     created_at,
     estimated_read_time,
     image,
     slug,
     icon,
     category,
     content,
 }`;
  const data = await client.fetch(query);
  return data;
};
export async function generateStaticParams() {
  const blogs = (await getBlog()) as Blog[];
  return blogs.map((blog) => ({
    slug: String(blog.slug?.current),
  }));
}
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const blog = (await getBlogWithSlug(slug)) as Blog;

  return {
    title: blog.title,
    description: blog.description,
    creator: "DoneWithWork",
    openGraph: {
      images: blog.image ? [urlFor(blog.image).url()] : [],
    },
  };
}
const getBlogWithSlug = async (slug: string) => {
  const query = `
  *[_type=="blog" && slug.current=="${slug}"] | order(created_at){
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
  }[0]`;
  const data = await client.fetch(query);
  return data;
};
const SingleBlog = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const data = (await getBlogWithSlug(slug)) as Blog;

  if (!data) {
    notFound();
  }
  return (
    <div>
      <section className="mt-10">
        <div className="flex flex-row w-100 justify-center">
          <p className="text-3xl">{data.icon}</p>
          <h1 className="text-4xl font-semibold  mb-4">{data.title}</h1>
        </div>
        <p className="text-base my-3">{data.description}</p>
        <Image
          src={data.image ? urlFor(data.image).url() : ""}
          alt={data.title || ""}
          width={1200}
          height={800}
          className="aspect-video rounded-xl shadow-sm shadow-blue-300"
        />
        <p className="text-base leading-relaxed mt-2 text-gray-200">
          <span>{data.created_at}</span>{" "}
          <span className="font-bold mx-1">•</span>{" "}
          <span>🕔 {data.estimated_reading_time} mins</span>{" "}
          <span className="font-bold mx-1">•</span>{" "}
          <span>{data.category?.toUpperCase()}</span>
        </p>
        <div className="prose prose-invert mt-10">
          <PortableText value={data.content || []} />
        </div>
      </section>
    </div>
  );
};

export default SingleBlog;
