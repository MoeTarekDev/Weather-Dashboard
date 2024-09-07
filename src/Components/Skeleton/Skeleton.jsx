export default function Skeleton({ className, numOfLines }) {
  return (
    <div className={`animate-pulse bg-skeletonBg py-10 ${className}`}>
      {numOfLines === 0 ? null : (
        <>
          <div className="flex flex-col h-full justify-around  px-5">
            <div className="w-[30%] rounded-xl animate-pulse h-4 bg-gray-300 "></div>
            <div>
              <div className="w-[80%] animate-pulse h-4 bg-gray-300 rounded-xl my-3"></div>
              <div className="w-[60%] animate-pulse h-4 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
