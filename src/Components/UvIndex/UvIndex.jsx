import { sun } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function UvIndex({ uvIndexMax, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;
  const uvIndexCategory = (uvIndex) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    } else {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
  };
  const marginLeftPercentage = (uvIndexMax / 14) * 100;
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sun} Uv Index</h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl flex flex-col">
            {uvIndexMax}
            <span className="text-sm">{uvIndexCategory(uvIndexMax).text}</span>
          </p>

          <div className="Heat-index w-full h-3 rounded-lg relative">
            <div
              style={{ marginLeft: marginLeftPercentage }}
              className={`indicator absolute w-3 h-full rounded-full bg-white border-2 border-black`}
            ></div>
          </div>
        </div>
      </div>

      <p className="text-sm line-clamp-1">
        {uvIndexCategory(uvIndexMax).protection}{" "}
      </p>
    </div>
  );
}
