import "../App.css";
import GeogitIcon from "../assets/GeogitIcon.png";
import { FaCity } from "react-icons/fa6";
import { GoQuestion, GoGraph, GoGitPullRequestClosed } from "react-icons/go";
import { BsGear } from "react-icons/bs";

function About() {
  return (
    <>
      <main className="bg-thegray home-no-scroll fade-in1">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          <div className="relative">
            <div className="relative z-10 pt-5 pb-20">
              <div className="flex justify-center select-none">
                <img src={GeogitIcon} alt="Geogit Icon" className="max-w-smallish pb-3 select-none pointer-events-none" />
              </div>

              <div className="pt-10 max-w-[42rem] px-5">
                <h1 className="text-left font-Mona font-bold text-white text-4xl leading-20 pb-2  ">
                  <GoQuestion className="inline align-bottom text-4xl" /> About locationGit
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4 ">
                  locationGit connects you to the heartbeat of software development communities around the world, offering businesses and individuals the ability to identify leading
                  software developers within their own region or an expansive view of global talent.
                  <p className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-2">
                    I started locationGit as I was finding it difficult to find other developers in my city who were excelling in the industry. Platforms like LinkedIn, GitHub and
                    Crunchbase, while useful, didn't quite cut it in painting an objective picture of the local software development scene. So I thought I could build a platform
                    that shows a more definitive picture of the community's standout developers.
                  </p>
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <BsGear className="inline align-bottom " /> How It Works
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-2">1 Choose a Location</h2>
                  Start by entering your desired location into the search box. Keep in mind, the results reflect the location users have entered themselves.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">2 Fetch and Display</h2>
                  Using the relavent API's, the top developers are compiled across GitHub, GitLab and BitBucket. The ranking is currently based on followers, most starred repo,
                  public repositories and public commits this year.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">3 User Insights</h2>
                  Each user has their profile picture, username, full name, followers, most starred repo, public commits this year and number of public repositories displayed, as
                  well as a link to either their GitHub, GitLab or BitBucket profile, as well as any other socials. Now includes a list of their most used languages.
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGraph className="inline align-bottom" /> Benefits for Developers
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-1">• Networking Opportunities</h2>
                  Connect with peers locally and globally. This can lead to collaborative projects, mentorship opportunities, and potentially career advancements.{" "}
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Increased Visibility</h2>
                  By showcasing their skills and projects, developers can gain recognition within their local community and beyond. This visibility can be crucial for freelance
                  developers or those seeking new career opportunities.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Community Awareness</h2>
                  Keeps developers in tune with their local tech community by providing insights into the top developers, helping users stay connected and engaged with regional
                  tech trends and opportunities.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Collaboration</h2>
                  For those looking to build a team or collaborate on projects, locationGit's ability to focus on local talent simplifies the search for compatible and skilled partners.{" "}
                </div>{" "}
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGitPullRequestClosed className="inline align-bottom" /> What Makes locationGit Different?
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-1">• Scope & Focus</h2>
                  Unlike LinkedIn, GitHub or Crunchbase, which generally focus on the big picture, locationGit can emphasize local software development communities, offering a unique
                  lens into regional talent and trends. <h2 className="text-white font-bold text-xl pt-4 pb-1">• Objective Metrics</h2>
                  locationGit uses a combination of followers, public repositories, and commits to objectively rank developers. This differs from LinkedIn, where visibility often
                  depends on networking skills, or GitHub, where activity isn't always a reflection of influence or skill.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Developer Profiles</h2>
                  While platforms like GitHub focus primarily on code repositories, locationGit provides a more holistic view of a developer, including their social media presence,
                  which offers a more rounded perspective on their professional persona.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Ease of Use</h2>
                  locationGit simplifies the process of finding leading developers in a specific region, a task that can be challenging on more generalized platforms like LinkedIn. The
                  platform also accomadates for technical and non-technical users alike.
                </div>{" "}
              </div>
            </div>
            <div className="flex justify-center">
  <a href="https://www.instagram.com/developer_rahul_/" target="_blank" rel="noopener noreferrer">
   <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
      alt="Instagram"
      style={{ width: "54px", height: "54px" }}
      width="54"
      height="54"
    />
  </a>
</div>
          </div>

          <a href="https://github.com/developerrahulofficial" target="_blank" rel="noopener noreferrer" className="text-white font-Hublot leading-5 tracking-wider pb-2 jack-sheehy">
            Developer Rahul ❤️ :) <br />
            ©2024
          </a>
        </div>
      </main>
    </>
  );
}
export default About;
