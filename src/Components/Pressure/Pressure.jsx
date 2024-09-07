import { gauge } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function Pressure({ pressure, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;

  function getPressurePhrase(pressure) {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  }
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">{getPressurePhrase(pressure)}.</p>
    </div>
  );
}
