import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <MaxWidthWrapper>
        <div className="min-h-screen "> {children}</div>
        <hr className="mt-20" />
        <footer className="px-2 py-5 ">
          <p className="text-center">© 2025 DoneWithWork</p>
        </footer>
      </MaxWidthWrapper>
    </div>
  );
};

export default BaseLayout;
