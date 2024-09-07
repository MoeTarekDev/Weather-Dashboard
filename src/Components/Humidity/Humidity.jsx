import { droplets } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function Humidity({ humidity, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;

  function getHumidityPhrase(humidity) {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  }
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityPhrase(humidity)}.</p>
    </div>
  );
}
