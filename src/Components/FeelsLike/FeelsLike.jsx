import { thermometer } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function FeelsLike({ feelsLike, avgTemp, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;
  function calculateFeelsLikePhrase(feelsLike, avgTemp) {
    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  }
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{feelsLike}°</p>
      </div>

      <p
        className={`text-sm ${
          calculateFeelsLikePhrase(feelsLike, avgTemp).split(" ").length > 5
            ? "line-clamp-2"
            : ""
        } `}
      >
        {calculateFeelsLikePhrase(feelsLike, avgTemp)}
      </p>
    </div>
  );
}
