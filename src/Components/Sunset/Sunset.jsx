import { sunset } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function Sunset({ sunsetTime, sunriseTime, isLoading }) {
  if (isLoading) return <Skeleton className="h-[12rem] rounded-lg" />;
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset}Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise: {sunriseTime}</p>
    </div>
  );
}
