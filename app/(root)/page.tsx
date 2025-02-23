import Carousel from "@/components/Carousel";
import DownloadResume from "@/components/DownloadResume";
import RecentPosts from "@/components/RecentPosts";
import { Project } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SocialIcon } from "react-social-icons";

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
const media_links = [
  {
    name: "Instagram",
    network: "instagram",
    url: "https://www.instagram.com/_donewithwork_/",
  },
  {
    name: "Github",
    network: "github",
    url: "https://github.com/DoneWithWork",
  },
  {
    name: "LinkedIn",
    network: "linkedin",
    url: "https://www.linkedin.com/in/donewithwork/",
  },
  {
    name: "Twitter",
    network: "x",
    url: "https://twitter.com/DoneWithWork",
  },
];
export const revalidate = 3600;
const Home = async () => {
  const projects = (await getProjects()) as Project[];
  return (
    <div>
      <section className="mt-16 max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start">
        <Image
          src={"/images/donewithwork.png"}
          alt="donewithwork"
          width={150}
          height={150}
          className="rounded-full border-white border-4 size-30 md:size-44"
        />

        <div className="md:pl-10 mt-3 mx-auto">
          <div className="text-3xl md:text-5xl font-semibold flex items-center ">
            <span className="overflow-hidden border-white whitespace-nowrap animate-typing h-20 flex flex-col justify-center">
              {"Hey, I'm Joshua Kong."}
            </span>
            <span className=" opacity-100 animate-blink text-gray-500 ">|</span>
          </div>
          <p className="text-gray-200 text-xl md:text-2xl">
            Student & Professional Web Developer
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-4">
            {media_links.map((link) => (
              <p className="flex flex-row gap-2 items-center" key={link.name}>
                <SocialIcon
                  url={link.url}
                  network={link.network}
                  style={{ width: 35, height: 35 }}
                />
                <Link
                  href={link.url!}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover text-base"
                >
                  {link.name}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col items-center mt-10">
        <DownloadResume />
      </div>
      <section className="mt-14">
        <p className="headings mb-5 md:mb-10">Recent Posts</p>
        <Suspense
          fallback={
            <div>
              <Skeleton
                className="animate-pulse h-24 my-2 "
                //dark gray
                baseColor="#1f2937"
                highlightColor="#1e2937"
                borderRadius={10}
                count={3}
              ></Skeleton>
            </div>
          }
        >
          <RecentPosts />
        </Suspense>
      </section>
      <section className="mt-14 h-[500px]">
        <Suspense fallback={<Skeleton height={500} count={1}></Skeleton>}>
          <Carousel projects={projects} />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
