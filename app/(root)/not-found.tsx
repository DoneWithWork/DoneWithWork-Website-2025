import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-10 text-2xl font-semibold">
        Sorry, The Content You Are Looking For Does Not Exists
      </h1>
      <Link href={"/"} className="mt-10">
        Return to <span className="underline text-blue-400">Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
