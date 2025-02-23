"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Confetti from "react-dom-confetti";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DownloadResume = () => {
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative inline-block">
      {/* Confetti positioned in the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Confetti
          active={isExploding}
          config={{
            startVelocity: 20,
            spread: 360,
          }}
        />
      </div>

      <Link
        href="/KongYongRaeJoshua_Resume_2025.pdf"
        target="_blank"
        className={cn(
          "border-[2px] px-4 py-4 rounded-xl font-semibold text-base group flex flex-row items-center gap-1"
        )}
        rel="noopener noreferrer"
        onClick={handleClick}
        download
      >
        Download Resume
        <ChevronDown className="size-4 group-hover:translate-y-1 group-hover:text-blue-400 duration-300 transition-all" />
      </Link>
    </div>
  );
};

export default DownloadResume;
