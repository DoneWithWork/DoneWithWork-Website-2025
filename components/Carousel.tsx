"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Project } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function Carousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  interface SwiperInstance {
    activeIndex: number;
  }

  const handleSlideChange = (swiper: SwiperInstance): void => {
    const newIndex = swiper.activeIndex;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <p className="headings text-center my-5 md:my-10">Projects</p>
      {/* Swiper for Images */}
      <Swiper
        modules={[Navigation]}
        navigation
        onSlideChange={handleSlideChange}
        className="relative"
      >
        {projects.map((project: Project, index: number) => (
          <SwiperSlide key={index}>
            <Image
              width={800}
              height={600}
              src={project.image ? urlFor(project.image).url() : ""}
              alt={project.title || ""}
              className="w-full h-full aspect-video object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Animated Text Section */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, x: direction * 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 50 }}
        transition={{ duration: 0.4 }}
        className="text-center mt-4"
      >
        <Link
          href={`/projects/${projects[activeIndex].slug?.current}`}
          className="text-2xl font-bold hover"
        >
          {projects[activeIndex].title}
        </Link>
        <p className="text-gray-200">{projects[activeIndex].description}</p>
      </motion.div>
    </div>
  );
}
