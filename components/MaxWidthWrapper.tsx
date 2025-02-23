import React, { ReactNode } from "react";

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
  );
};

export default MaxWidthWrapper;
