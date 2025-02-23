import { Project } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const getProjects = async () => {
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
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
};
export const revalidate = 3600;
const Projects = async () => {
  const data = await getProjects();
  return (
    <div>
      <section>
        <h1 className="headings mb-10">Projects</h1>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
        {data.map((project: Project) => {
          return (
            <div key={project._id}>
              <Link
                href={`/projects/${project.slug?.current}`}
                className="flex flex-row items-center gap-2 mb-2 group "
              >
                <p className="text-2xl md:text-3xl">{project.icon}</p>
                <p className="text-2xl md:text-3xl font-semibold group-hover:text-blue-400">
                  {project.title}
                </p>
              </Link>

              <Image
                src={project.image ? urlFor(project.image).url() : ""}
                alt={project.title || ""}
                width={1200}
                height={800}
                className="object-cover aspect-video rounded-xl shadow-sm shadow-blue-300"
              />
              <p className="text-base leading-relaxed mt-2 text-gray-200">
                <span>{project.created_at}</span>{" "}
                <span className="font-bold mx-1">•</span>{" "}
                <span>{project.category?.toUpperCase()}</span>
              </p>
              <p className="text-base">{project.description}</p>
              {/* <div className="prose prose-invert">
              <PortableText value={project.content || []} />
            </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
