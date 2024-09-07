import { Simple } from "@theme-toggles/react";
import { House, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../.scrollbar.css";
import useFeatures from "../../Context/features.context";
import useCountryWeather from "../../Hooks/useCountryWeather";
import { countries, countryToIsoMap } from "../../_lib/data-service";
export default function Navbar() {
  let [isGlassVisible, setIsGlassVisible] = useState(true);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  let { state } = useParams();
  let {
    homeDefaultState,
    setHomeDefaultState,
    setCountryIsoCode,
    countryIsoCode,
    setFirstState,
    setSecondsState,
    isItDark,
    setIsItDark,
    isNavBarOpened,
  } = useFeatures();
  let { data, statesData } = useCountryWeather(
    homeDefaultState,
    countryIsoCode
  );
  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const filteredItems = useMemo(() => {
    return countries.filter((country) => {
      return country.toLocaleLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  function handleTheme() {
    setIsItDark((prev) => !prev);
    localStorage.setItem("isItDark", JSON.stringify(!isItDark));
  }
  useEffect(() => {
    if (isItDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isItDark]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsGlassVisible(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function changeDefaultState(state) {
    const isoCode = countryToIsoMap[state];
    setCountryIsoCode(isoCode);
    setHomeDefaultState(state);
    localStorage.setItem("isoCode", isoCode);
    localStorage.setItem("state", state);
    localStorage.setItem("country", state);
    setQuery("");
  }
  useEffect(() => {
    if (statesData) {
      const firstState = statesData.data.filter((state, index) => index < 2)[0]
        .name;
      const secondState = statesData.data.filter((state, index) => index < 2)[1]
        .name;
      setFirstState(firstState);
      setSecondsState(secondState);
      localStorage.setItem("firstState", firstState);
      localStorage.setItem("secondState", secondState);
    }
  }, [statesData]);
  return (
    <>
      {isNavBarOpened && (
        <nav
          className={`container px-5 relative mx-auto h-[100px] py-8 flex items-center gap-2 justify-between`}
        >
          <div
            className={`text-textColor absolute ps-5 top-1/2 -translate-y-1/2 left-0 flex md:flex-row ${
              state ? "flex-row" : "flex-col"
            } items-center md:items-start ${
              state ? "overflow-hidden gap-2" : "md:overflow-hidden md:gap-2"
            }  `}
          >
            <MapPin
              onClick={() => {
                setIsLocationVisible((prev) => !prev);
              }}
              className="cursor-pointer z-20"
            />
            <span
              className={`text-textColor text-sm md:text-sm
         font-medium w-[170px] line-clamp-1 ${
           state ? "static" : "absolute"
         } md:static top-[99px] md:top-[99px] md:w-[170px] ${
                state ? "rotate-0" : "-rotate-90"
              } md:rotate-0 transition-[transform_opacity] duration-300
         ${
           !isLocationVisible
             ? ` ${
                 state ? "-translate-x-[240px]" : "opacity-0"
               } md:-translate-x-[240px]`
             : ` ${state ? "-translate-x-0" : ""} md:-translate-x-0`
         }`}
            >
              {!state
                ? data?.data?.data?.request[0].query
                : `${state}, ${homeDefaultState}`}
            </span>
          </div>

          {!state ? (
            <form
              className={`bg-newBoxesColor mx-auto w-[200px] sm:w-[350px] relative text-sm ${
                query && filteredItems.length > 0
                  ? "rounded-tr-xl rounded-tl-xl"
                  : "rounded-xl"
              } py-2 ps-2 pe-2 `}
            >
              <div className=" w-full relative overflow-hidden">
                <Search
                  className={`size-6 ps-2 text-textColor absolute left-0 top-1/2 -translate-y-1/2 bottom-2 transition-opacity duration-200 ${
                    isGlassVisible ? "z-10 opacity-100" : "z-0 opacity-0"
                  }`}
                />

                <input
                  value={query}
                  ref={inputRef}
                  onFocus={() => {
                    setIsGlassVisible(false);
                  }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  type="text"
                  className={`bg-newBoxesColor text-textColor font-medium focus:outline-none ps-8 w-full  transition-transform duration-300 ${
                    isGlassVisible ? "z-0" : "z-10  -translate-x-6 "
                  }`}
                  placeholder="Search country..."
                />
              </div>
              <ul
                className={`${
                  query && filteredItems.length > 0 ? "block" : "hidden"
                } w-full custom-scrollbar rounded-br-xl  z-50 rounded-bl-xl absolute top-full  left-0 right-0 p-1 bg-newBoxesColor max-h-[300px] overflow-y-auto`}
              >
                {filteredItems.map((country, index) => (
                  <li
                    key={index}
                    onClick={(e) => {
                      changeDefaultState(e.target.innerHTML);
                    }}
                    className="p-2 hover:bg-inputHoverColor rounded-md text-textColor cursor-pointer"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </form>
          ) : (
            <Link
              to="/"
              className={` inline-block text-textColor p-2 border-newBoxesBorder border bg-newBoxesColor rounded-md hover:bg-inputHoverColor transition-colors duration-200 ${
                state ? "order-1" : "ms-auto"
              }`}
            >
              <House className="size-5" />
            </Link>
          )}
          <Simple
            className={`${state ? "ms-auto" : ""}`}
            toggled={isItDark}
            onToggle={handleTheme}
          />
        </nav>
      )}
    </>
  );
}
