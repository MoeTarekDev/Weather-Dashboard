import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFeatures from "../../Context/features.context";

export default function Error({ error, errorButtonText }) {
  let { setIsNavBarOpened } = useFeatures();

  useEffect(() => {
    setIsNavBarOpened(false);
    return () => {
      setIsNavBarOpened(true);
    };
  });

  return (
    <>
      <div className="container mx-auto flex items-center justify-center px-5 min-h-screen">
        <div className=" flex-col gap-5 flex items-center justify-center md:w-[700px]">
          <h1 className="text-5xl font-bold text-center">
            Something went wrong !
          </h1>
          <p className="text-2xl text-center font-medium w-[80%]">{error}</p>
          <Link
            className="inline-block text-textColor py-2 px-4 border-newBoxesBorder border bg-newBoxesColor rounded-md hover:bg-inputHoverColor transition-colors duration-200"
            to="/"
          >
            {errorButtonText}
          </Link>
        </div>
      </div>
    </>
  );
}
