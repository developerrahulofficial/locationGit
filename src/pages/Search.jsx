import React, { useState, useEffect } from "react";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";
import Cobe from "../components/AutoGlobe";
import { GoPeople, GoRepo, GoGitPullRequest, GoStar } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../components/dialog";

function Search({ isAuthenticated }) {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState([45, 10]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityFromURL = params.get("city");
    if (cityFromURL) {
      setCity(cityFromURL);
    }
  }, [location]);

  const handleCityChange = (selectedCity, coords) => {
    setCity(selectedCity);
    setCoordinates(coords);
    navigate(`?city=${selectedCity}`);
  };

  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
        </div>

        <div className="hidden lg:block">
          <Cobe coordinates={coordinates} />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-6 pb-6">
            <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">Search</h1>
            <div className="flex select-none">
              <p className="font-Hublot select-none text-gray-300 mr-4 max-w-[28rem] leading-[1.7rem] fade-in2">
                Start by entering the location you want to rank developers from. Keep in mind, the results reflect the location users have entered themselves and are not entirely
                definitve.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            {" "}
            <Dialog>
              <DialogTrigger>
                <div className="fade-in1 mb-4 mr-4 px-3.5 py-[0.4rem] rounded-[0.5rem] bg-transparent   text-white border border-gray-300 hover:border-gray-500 transition ease-in-out">
                  ?
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-xs rounded-s fade-in2 pointer-events-none select-none">
                <p className="font-Hublot text-gray-300 text-lg">
                  <div className="text-[1.3rem] text-white font-bold font-Mona ">Ranking Criteria</div>
                  <div className=" text-gray-400 pb-2 font-Mona ">In order of significance</div>

                  <span className="flex items-center mr-4 mb-1">
                    <GoPeople className="text-white" />
                    <span className="ml-2">Followers</span>
                  </span>

                  <span className="flex items-center mr-4 mb-1">
                    <GoStar className="text-white" />
                    <span className="ml-2">Most Starred Repo</span>
                  </span>

                  <span className="flex items-center mb-1">
                    <GoGitPullRequest className="text-white" />
                    <span className="ml-2">Public Commits in 2023</span>
                  </span>

                  <span className="flex items-center">
                    <GoRepo className="text-white" />
                    <span className="ml-2">Public Repos</span>
                  </span>
                </p>
              </DialogContent>
            </Dialog>
            <LocationAutosuggest
              selectedCity={city}
              onCityChange={(selectedCity, coords) => {
                handleCityChange(selectedCity, coords);
              }}
            />
          </div>
        </div>

        <div className=" pt-2 "></div>

        <div className="flex flex-col items-start justify-center relative pb-32 px-4 md:px-8 lg:px-32">
          <div className="relative z-1000 pt-0 pb-0">
            <TopGithubUsers city={city} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
