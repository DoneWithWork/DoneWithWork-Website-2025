import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="px-3 py-8 max-w-7xl mx-auto ">
      <div className="flex flex-row justify-between items-center flex-wrap">
        <Logo />
        <div className="flex flex-row items-center justify-between gap-10 sm:gap-20">
          <Link href={"/projects"} className="hover">
            Projects
          </Link>
          <Link href={"/blog"} className="hover">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
