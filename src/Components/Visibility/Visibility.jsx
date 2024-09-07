import { eye } from "../../utilities/Icons";
import Skeleton from "../Skeleton/Skeleton";

export default function Visibility({ visibility, isLoading }) {
  if (isLoading) return <Skeleton className=" h-[12rem] rounded-lg" />;
  function getVisibilityPhrase(visibility) {
    if (visibility > 10) return "Excellent: Clear and vast view";
    if (visibility > 5) return "Good: Easily navigable";
    if (visibility > 2) return "Moderate: Some limitations";
    if (visibility <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none bg-newBoxesColor border-newBoxesBorder text-textColor">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">{visibility} mph</p>
      </div>

      <p className="text-sm">{getVisibilityPhrase(visibility)}.</p>
    </div>
  );
}
