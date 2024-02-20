import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { Link } from "react-router-dom";
import GeogitIcon from "../assets/GeogitIcon.png";
import { IoSparklesSharp } from "react-icons/io5";

import "../App.css";

const CLIENT_ID = "e50dc202beb3d470f91f";

export default function SignIn({ setIsAuthenticated }) {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await fetch(`https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/getAccessToken?code=${codeParam}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setIsAuthenticated(true);
              window.location.href = "/Search";
            }
          });
      };
      getAccessToken();
    }
  }, []);

  useEffect(() => {
    const fetchGithubUserData = async (accessToken) => {
      await fetch(`https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/getGithubUserData?accessToken=${accessToken}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    };

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchGithubUserData(accessToken);
    }
  }, [isAuthenticated]);

  const loginWithGithub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <main className="bg-thegray home-no-scroll fade-in1">
        <div className="min-h-screen flex items-center justify-center relative ">
          {/*Background behind other elements */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative z-10 pt-0 pb-40">
            <div className="px-9 py-8 signInCard">
              <div className="flex items-center flex-nowrap"></div>

              {isAuthenticated && userData ? (
                <>
                  <h1 className="font-Mona font-bold text-4xl ">
                    <span className="text-white">Welcome</span>, {userData.login}!
                  </h1>
                  <h2 className="text-center pt-3 pb-4 text-gray-300"> You have successfully signed in.</h2>
                  <div className="flex justify-center items-center">
                    <Link to="/search" className="get-started-button font-mono select-none ">
                      <IoSparklesSharp className="inline align-text-top " /> Get Started
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-Mona font-bold text-4xl ">Geogit</h1>

                  <h2 className="font-Mona font-bold pt-6 text-xl">Sign in</h2>
                  <h3 className="font-Mona pt-1 text-gray-300 text-lg pb-5">
                    to continue to <span className="text-gray-300 font-bold">Geogit</span>
                  </h3>
                  <button className="signInButton text-md flex items-center py-2.5 whitespace-nowrap" onClick={!isAuthenticated ? loginWithGithub : null}>
                    <AiFillGithub className="text-2xl" />
                    <span className="ml-3 ">Sign in With GitHub</span>
                  </button>
                  <h3 className="flex items-center text-md  justify-center text-gray-400 pt-2">
                    <Link to="/Terms">
                      By signing in you agree to <b>terms of service</b>.
                    </Link>
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
