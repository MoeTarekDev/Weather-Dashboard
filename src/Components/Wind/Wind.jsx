import windBody from "../../../public/compass_body.svg";
import windArrow from "../../../public/compass_arrow.svg";
import { wind } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";
export default function Wind({ windDir, windSpeed, isLoading }) {
  if (isLoading)
    return <Skeleton className=" h-[12rem] rounded-lg" numOfLines={0} />;
  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
    flex-col gap-3 shadow-sm bg-newBoxesColor text-textColor border-newBoxesBorder"
    >
      <h2 className="flex items-center gap-2 font-medium">{wind} Wind</h2>

      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <img src={windBody} alt="compass" width={110} height={110} />
          <img
            src={windArrow}
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs text-textColor font-medium">
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}
