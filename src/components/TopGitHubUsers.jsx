import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { GoPeople, GoRepo, GoGitPullRequest, GoBriefcase, GoOrganization, GoMail, GoLink, GoStar } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { request, gql } from "graphql-request";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./github-colors.css";
import numeral from "numeral";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./dialog";

const BLANK_USERS = [];
const fetchPublicCommits = async (username) => {
  const query = gql`
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;
  const variables = { username };
  const headers = {
    Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  };
  try {
    const data = await request("https://api.github.com/graphql", query, variables, headers);
    const totalContributions = data.user.contributionsCollection.contributionCalendar.totalContributions;

    // Format the number with numeral.js
    return numeral(totalContributions).format("0.[0]a");
  } catch (error) {
    console.error(`Failed to get commit count for ${username}`, error);
    return 0;
  }
};

const fetchMostStarredRepo = async (username, headers) => {
  try {
    let highestStars = 0;

    const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `;

    const variables = { username };
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API returned ${response.status}`);
    }

    const { data } = await response.json();
    const repos = data.user.repositories.nodes;

    if (repos.length > 0) {
      highestStars = repos[0].stargazers.totalCount;
    }

    return numeral(highestStars).format("0.[0]a");
  } catch (error) {
    console.error("Error fetching most starred repo:", error);
    return 0;
  }
};
export default function TopGitHubUsers({ city, isAuthenticated }) {
  const [users, setUsers] = useState(BLANK_USERS);
  const [prefetchedUsers, setPrefetchedUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchTopUsers = async (pageNumber, prefetch = false) => {
    if (!city) {
      setUsers(BLANK_USERS);
      setDataLoaded(true);
      return;
    }

    const baseUrl = `https://api.github.com/search/users?q=location:${city}&sort=followers&order=desc&per_page=10&page=${pageNumber}`;
    const headers = {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };

    try {
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      const usersList = data.items || [];

      const usersOnlyList = usersList.filter((user) => user.type === "User");

      const usersWithDetails = await Promise.all(
        usersOnlyList.map(async (user) => {
          const userDetailsPromise = fetch(`https://api.github.com/users/${user.login}`, { headers }).then((res) => res.json());
          const publicCommitsPromise = fetchPublicCommits(user.login);
          const highestStars = await fetchMostStarredRepo(user.login, headers);
          const [userDetails, publicCommits] = await Promise.all([userDetailsPromise, publicCommitsPromise]);

          return {
            ...user,
            ...userDetails,
            reposCount: userDetails.public_repos,
            publicCommits: numeral(publicCommits).format("0.[0]a"),
            highestStars: numeral(highestStars).format("0.[0]a"),
            score: 0.4 * userDetails.followers + 0.2 * publicCommits + userDetails.public_repos * 0.1 + highestStars * 0.3,
          };
        })
      );

      if (prefetch) {
        setPrefetchedUsers(usersWithDetails);
      } else {
        setUsers((prevUsers) => [...prevUsers.slice(0, (pageNumber - 1) * 10), ...usersWithDetails, ...prevUsers.slice(pageNumber * 10)]);
        fetchTopUsers(pageNumber + 1, true);
      }
    } catch (error) {
      console.error("An error occurred while fetching data", error);
    } finally {
      if (!prefetch) {
        setDataLoaded(true);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setUsers(BLANK_USERS);
    setDataLoaded(false);
    if (city) {
      setSearchAttempted(false);
      fetchTopUsers(1).finally(() => setSearchAttempted(true));
    }
  }, [city]);
  const loadMoreUsers = () => {
    setPage((prevPage) => {
      
        const newPage = prevPage + 1;
        setUsers((prevUsers) => [...prevUsers, ...prefetchedUsers]);
        fetchTopUsers(newPage + 1, true);
        return newPage;
      
    });
  };

  const fetchTopLanguages = async (username, setLanguages, token) => {
    const query = `
      query {
        user(login: "${username}") {
          repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
            edges {
              node {
                name
                languages(first: 5) {
                  edges {
                    node {
                      name
                    }
                    size
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const { user } = await request("https://api.github.com/graphql", query, {}, { Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}` });
      let languages = {};

      user.repositories.edges.forEach(({ node }) => {
        node.languages.edges.forEach(({ node: languageNode, size }) => {
          const language = languageNode.name;
          languages[language] = (languages[language] || 0) + size;
        });
      });

      const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((acc, [language, size]) => ({ ...acc, [language]: size }), {});

      setLanguages(sortedLanguages);
    } catch (error) {
      console.error("Error fetching top languages:", error);
      setLanguages({});
    }
  };

  function UserLanguages({ username, token }) {
    const [languages, setLanguages] = useState(null);

    useEffect(() => {
      fetchTopLanguages(username, setLanguages, token);
    }, [username, token]);

    if (languages === null) {
      return <PulseLoader color={"gray"} size={7} className="pt-14" />;
    }
    const getLanguageClassName = (language) => {
      const specialCases = {
        "C#": "CSharp",
        "C++": "cpp",
        "Jupyter Notebook": "Jupyter-Notebook",
        "Vim Script": "VimScript",
      };

      return specialCases[language] || language;
    };

    return (
      <div>
        <h3 className="font-bold pb-2">Top Languages</h3>
        <ul className="text-gray-300">
          {Object.keys(languages).length === 0 ? (
            <li>No languages found.</li>
          ) : (
            Object.entries(languages).map(([language]) => (
              <li key={language} className="flex items-center mb-1.5">
                <span className={`language-color-dot ${getLanguageClassName(language)} White`}></span>
                {language}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

  function formatUrl(url) {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    } else {
      return "http://" + url;
    }
  }

  return (
    <div className="px-0 md:px-0">
      <ul>
        {dataLoaded && searchAttempted && users.length === 0 ? (
          <div className="font-Hublot text-gray-300 leading-[1.7rem] text-center">No users found :(</div>
        ) : (
          users.map((user, index) => (
            <li key={user.id || index} style={{ animationDelay: `${index * 0.1}s` }} className="github-user">
              {user.id ? (
                <>
                  <div className="flex items-center mb-2 md:mb-0">
                    <strong>{index + 1}</strong>
                    <Dialog>
                      <DialogTrigger asChild>
                        <a className="pl-3 flex items-center cursor-pointer">
                          <img src={user.avatar_url} alt={user.name} className="w-12 h-12 rounded-full" />
                          {user.login && (
                            <span className="font-Mona whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[16rem] text-white pl-4 md:font-bold">
                              {user.name || user.login}
                            </span>
                          )}
                        </a>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex items-left  text-white">
                          <div className="">
                            <div className="select-none pointer-events-none">
                              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                            </div>

                            <div className="flex justify-left pt-2  items-center">
                              {user.name && (
                                <div className="">
                                  <span className="font-bold text-xl font-Mona max-w-xl  ">{user.name}</span>
                                </div>
                              )}
                              <div className="px-2 pt-1 text-gray-500">•</div>
                              <div className="flex items-center">
                                <div className="text-gray-300 max-w-[10rem] sm:max-w-[19rem] text-xl truncate">{user.location}</div>
                              </div>
                            </div>

                            <div className="pt-2 pb-2 text-md text-left justify-left">
                              <span className="text-left font-Hublot break-words overflow-hidden max-w-[10rem] sm:max-w-full">{user.bio || " "}</span>
                            </div>
                          </div>

                          <div className="px-4 mt-2 h-[1px] bg-gray-500"></div>

                          <div className="text-lg font-Hublot pt-6 pb-2">
                            <div className="flex flex-row items-start">
                              <div className="flex-grow">
                                <ul>
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Company">
                                      <span>
                                        <GoOrganization className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300 max-w-[10rem] sm:max-w-[15rem] truncate">{user.company || "Not Specified"}</div>
                                  </li>

                                  {/* Hireable Info */}
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Job Status">
                                      <span>
                                        <GoBriefcase className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300">{user.hireable === null ? "Undisclosed" : user.hireable ? "Open to Work" : "Not Seeking Employment"}</div>
                                  </li>

                                  {/* Followers Info */}
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Followers">
                                      <span>
                                        <GoPeople className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300"> {numeral(user.followers).format("0.[0]a")}</div>
                                  </li>

                                  {/* Most Starred Repo Info */}
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Most Starred Repo">
                                      <span>
                                        <GoStar className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300">{user.highestStars}</div>
                                  </li>

                                  {/* Public Commits Info */}
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Public Commits (2023)">
                                      <span>
                                        <GoGitPullRequest className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300">{user.publicCommits}</div>
                                  </li>

                                  {/* Public Repos Info */}
                                  <li className="flex items-center mb-2">
                                    <Tippy content="Public Repos">
                                      <span>
                                        <GoRepo className="inline-block font-bold mr-2 text-white" />
                                      </span>
                                    </Tippy>
                                    <div className="text-gray-300">{user.public_repos}</div>
                                  </li>
                                </ul>
                              </div>

                              {/*User Languages */}
                              <div className="flex-grow">
                                <UserLanguages username={user.login} token={import.meta.env.VITE_GITHUB_TOKEN} />
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-5 justify-center items-center pt-1 text-2xl">
                            {/* Social Links */}
                            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                              <BsGithub />
                            </a>
                            {user.blog && (
                              <a href={formatUrl(user.blog)} target="_blank" rel="noopener noreferrer">
                                <GoLink />
                              </a>
                            )}
                            {user.email && (
                              <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                <GoMail />
                              </a>
                            )}
                            {user.twitter_username && (
                              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                <FaXTwitter />
                              </a>
                            )}
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center gap-6 md:gap-4">
                    {/* Quick Stats */}
                    <div className="flex items-center gap-1 min-w-[3rem] pl-1">
                      <GoPeople /> {numeral(user.followers).format("0.[0]a")}
                    </div>
                    <div className="flex items-center gap-1 min-w-[3rem]">
                      <GoStar /> {user.highestStars}
                    </div>
                    <div className="flex items-center gap-1 min-w-[3rem]">
                      <GoGitPullRequest /> {user.publicCommits}
                    </div>
                    <div className="flex items-center gap-1 min-w-[3rem]">
                      <GoRepo /> {numeral(user.public_repos).format("0.[0]a")}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="w-12 h-12" />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      {!dataLoaded ? (
        <div className="text-center width-1rem"></div>
      ) : (
        city &&
        users.length > 0 &&
        page < 10 && (
          <button onClick={loadMoreUsers} className="font-mono select-none show-more-button mx-auto block">
            Show More
          </button>
        )
      )}
    </div>
  );
}
