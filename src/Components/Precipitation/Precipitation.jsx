import { CloudRainWind } from "lucide-react";
import Skeleton from "../Skeleton/Skeleton";

export default function Precipitation({ precipMM, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <CloudRainWind className="size-4 mt-[3px]" /> precipitation
        </h2>
        <p className="pt-4 text-2xl">{precipMM}mm</p>
      </div>
      <p className="text-sm">No recent precipitation.</p>
    </div>
  );
}
