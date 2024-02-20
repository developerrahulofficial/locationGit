import "../App.css";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";
import { IoSparklesSharp } from "react-icons/io5";
import { GoPeople, GoGitPullRequest, GoRepo, GoStar } from "react-icons/go";

import TypingAnimation from "../components/TypingAnimation";

function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll ">
        <div className="min-h-screen flex items-center justify-center relative ">
          {/*Background behind other elemetns */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative">
            {/* Globe behind other elements*/}
            <div className="absolute flex justify-center globe-position pt-10 fade-in3">
              <GlobeComponent />
            </div>
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              {/*Main content / Hero section */}
              <div className="HomeContainer ">
                <h1 className="hidden md:block text-center pb-1 lg:pl-6 pointer-events-none select-none customFont text-7xl text-gray-100 leading-[1.1] max-w-[55rem] fade-in1">
                  Rank the top <span className="pr-10">software</span> <span className="pl-5">developers</span> in <TypingAnimation />
                </h1>

                <h1 className="md:hidden text-center pb-4 lg:pl-6 pointer-events-none select-none px-4 customFont text-5xl text-gray-100 leading-[1.1] max-w-[53rem ]">
                  Rank the top software developers by <span className="custom-text-shadow">location</span>.
                </h1>

                {/* Display on larger screens */}
                <div className=" pb-4 select-none text-center font-Hublot text-gray-300 text-xl max-w-[33rem] leading-20 pt-4 fade-in2">
                  Start by entering the location you want to rank software developers from. Ranks are based on{" "}
                  <span className="text-white">
                    <GoPeople className="inline align-text-bottom" /> followers
                  </span>
                  ,{" "}
                  <span className="text-white">
                    <GoStar className="inline align-text-bottom" /> stars
                  </span>
                  ,{" "}
                  <span className="text-white">
                    <GoGitPullRequest className="inline align-text-bottom" /> commits
                  </span>{" "}
                  and{" "}
                  <span className="text-white">
                    <GoRepo className="inline align-text-bottom" /> repos.
                  </span>
                </div>

                <Link to="/search" className="get-started-button font-mono select-none fade-in3">
                  <IoSparklesSharp className="inline align-text-top" /> Get Started
                </Link>
              </div>
            </div>
          </div>

          <a href="https://my-portfolio-upgraded-pr2utpg2t-developerrahulofficial.vercel.app" target="_blank" rel="noopener noreferrer" className=" font-Hublot leading-12 tracking-wider pb-2 jack-sheehy">
            <span className="text-gray-300 font-bold">Developer Rahul ❤️ :) </span> <br />
            <span className="text-gray-400"> ©2023 </span>
          </a>
        </div>
      </main>
    </>
  );
}
export default Home;
