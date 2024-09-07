import { Info } from "lucide-react";

export default function Tooltip({ title, content }) {
  return (
    <div className="px-5 pt-5 text-textColor font-medium flex items-center justify-between ">
      <span> {title}</span>
      <div className="relative group w-fit">
        <Info className="cursor-help" />
        <span className="bg-inputHoverColor group-hover:visible bottom-full right-0 min-w-[250px] md:min-w-[450px] max-w-[300px] md:max-w-[550px] text-textColor text-center py-2 px-3 text-xs md:text-sm rounded-md invisible absolute mb-1">
          {content}
        </span>
      </div>
    </div>
  );
}
