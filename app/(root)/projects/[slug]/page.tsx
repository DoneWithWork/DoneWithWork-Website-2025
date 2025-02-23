import { Project as ProjectType } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamicParams = true; // if new slug, server render.
export async function generateStaticParams() {
  const getProject = async () => {
    const query = `
   *[_type=="project"] | order(created_at){
     _id,
       title,
       description,
       created_at,
       image,
       slug,
       icon,
       category,
       content,
   }`;
    const data = await client.fetch(query);
    return data;
  };
  const projects = (await getProject()) as ProjectType[];
  return projects.map((project) => ({
    slug: String(project.slug?.current),
  }));
}
const getProject = async (slug: string) => {
  const query = `
  *[_type=="project" && slug.current=="${slug}"]{ 
    _id,
    title,
    description,
    created_at,
    image,
    slug,
    icon,
    category,
    content,
  }[0]`;
  const data = await client.fetch(query);
  return data;
};

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const project = (await getProject(slug)) as ProjectType;

  return {
    title: project.title,
    description: project.description,
    creator: "DoneWithWork",
    openGraph: {
      images: project.image ? [urlFor(project.image).url()] : [],
    },
  };
}
const Project = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const data = (await getProject(slug)) as ProjectType;

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
        <Image
          src={data.image ? urlFor(data.image).url() : ""}
          alt={data.title || ""}
          width={1200}
          height={800}
          className="object-cover aspect-video rounded-xl shadow-sm shadow-blue-300"
        />
        <p className="text-base leading-relaxed mt-2 text-gray-200">
          <span>{data.created_at}</span>{" "}
          <span className="font-bold mx-1">•</span>{" "}
          <span>{data.category?.toUpperCase()}</span>
        </p>
        <div className="prose prose-invert mt-10 max-w-full">
          <PortableText value={data.content || []} />
        </div>
      </section>
    </div>
  );
};

export default Project;
