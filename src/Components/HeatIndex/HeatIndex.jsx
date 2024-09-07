import { heatIndexDescriptions } from "../../_lib/data-service";
import { thermo } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function HeatIndex({ heatIndex, isLoading }) {
  if (isLoading)
    return (
      <Skeleton
        numOfLines={3}
        className="h-[12rem] col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 rounded-lg"
      />
    );
  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       shadow-sm  col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 bg-newBoxesColor text-textColor border-newBoxesBorder"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Heat Index
      </h2>
      <div className="Heat-index w-full h-3 rounded-lg relative">
        <div
          style={{ left: `${heatIndex}%` }}
          className={`indicator absolute w-3 h-full rounded-full bg-white border-2 border-black`}
        ></div>
      </div>

      <p className="text-sm">Heat is {heatIndexDescriptions[heatIndex]}.</p>
    </div>
  );
}
