import { Blog } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React from "react";
const getProjects = async () => {
  const query = `
  *[_type=="blog"] | order(created_at){
    _id,
      title,
      description,
      slug,
      estimated_reading_time,
      created_at,
      image,
      category,
      content,
      icon,
  }[0..2]`;
  const data = await client.fetch(query);
  return data;
};
const RecentPosts = async () => {
  const data = await getProjects();
  return (
    <div className="flex flex-col justify-center gap-8">
      {data.map((post: Blog) => {
        return (
          <div key={post._id}>
            <Link
              href={`/blog/${post.slug?.current}`}
              className="flex flex-row items-center gap-2 mb-2 group "
            >
              <p className="text-2xl md:text-3xl">{post.icon}</p>
              <p className="text-2xl md:text-3xl font-semibold group-hover:text-blue-400">
                {post.title}
              </p>
            </Link>
            <p className="text-base leading-relaxed text-gray-200">
              <span>{post.created_at}</span>{" "}
              <span className="font-bold">.</span>{" "}
              <span>🕔 {post.estimated_reading_time} mins</span>{" "}
              <span className="font-bold">.</span>{" "}
              <span>{post.category?.toUpperCase()}</span>
            </p>
            <p className="text-base">{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RecentPosts;
