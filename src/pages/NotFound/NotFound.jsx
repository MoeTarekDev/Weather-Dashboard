import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFeatures from "../../Context/features.context";

export default function NotFound() {
  let { setIsNavBarOpened } = useFeatures();
  useEffect(() => {
    setIsNavBarOpened(false);
    return () => {
      setIsNavBarOpened(true);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 items-center mx-auto h-full  md:w-[700px]">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl text-center font-medium w-[80%]">
          Looks like the weather took a wrong turn! The page you're looking for
          is lost in the clouds.
        </p>
        <Link
          className="inline-block text-textColor py-2 px-4 border-newBoxesBorder border bg-newBoxesColor rounded-md hover:bg-inputHoverColor transition-colors duration-200"
          to="/"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
