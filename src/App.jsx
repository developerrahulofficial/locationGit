import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { GoPerson, GoSignOut, GoLocation } from "react-icons/go";

import { BsGithub } from "react-icons/bs";

import Home from "./pages/Home"; 
import Search from "./pages/Search";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Terms from "./pages/terms";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/dialog";
import { Separator } from "./components/Separator";

import GeogitIcon from "./assets/GeogitIcon.png";

function App() {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchGithubUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        await fetch(`https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/getGithubUserData?accessToken=${accessToken}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setUserData(data);
          });
      }
    };
    fetchGithubUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserData(null);
    window.location.reload();
  };

  const deleteAccount = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      await fetch("https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/deleteAccount", {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Account deleted") {
            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);
          } else {
            console.error("Failed to delete the account.");
          }
        });
    }
  };

  const [showBanner, setShowBanner] = useState(true);

  return (
    <Router>
      {/*
      {showBanner && (
        <div className="bg-[#DA552F] h-14 flex items-center justify-center select-none relative ">
          {" "}
          <a href="https://www.producthunt.com/posts/Geogit" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <h1 className="text-white  tracking-wide">
              😺 Geogit is featured on <span className="font-bold text-white">Product Hunt</span> today - Check it out :)
            </h1>
          </a>
          <a href="https://www.producthunt.com/posts/Geogit?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-Geogit" target="_blank">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=426015&theme=light"
              alt="Geogit - Rank the top software developers by location 🌎 | Product Hunt"
              style={{ width: "275px", height: "39px" }}
              width="250"
              height="54"
            />
          </a>
          <button className="absolute right-6 top-2 text-white text-2xl font-bold" onClick={() => setShowBanner(false)}>
            ×
          </button>
        </div>
      )}
      */}

      <header className="bg-transparent py-1">
        <div className="container mx-auto pt-4 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
          <Link to="/" className="flex items-center space-x-3 mb-4 sm:mb-0 select-none">
            <img src={GeogitIcon} alt="Geogit Icon" className="GeoIcon max-w-smaller hidden sm:block" />
            <span className="hidden sm:inline text-white font-bold text-2xl select-none">LocationGit</span>
          </Link>
          <nav className="flex items-center font-Hublot">
            <ul className="flex space-x-2 sm:space-x-4 text-gray-300 font-bold select-none">
              <li>
                <Link to="/" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Search" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/About" className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300">
                  About
                </Link>
              </li>

              {userData ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img src={userData.avatar_url} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  </DropdownMenuTrigger>
                  <Dialog>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="font-bold font-Mona max-w-[12rem] whitespace-nowrap  text-lg ">{userData.name}</DropdownMenuLabel>
                      <DropdownMenuLabel className="font-Hublot custom-width pb-1 text-gray-300 text-sm">{userData.location}</DropdownMenuLabel>{" "}
                      <DropdownMenuSeparator className="bg-neutral-600" />
                      <DialogTrigger asChild>
                        <DropdownMenuItem className="font-Hublot text-md">
                          <GoPerson className="mr-2 text-lg" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuSeparator className="bg-neutral-600" />
                      <DropdownMenuItem className="font-Hublot" onClick={handleLogout}>
                        <GoSignOut className="mr-2 text-lg" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-white text-3xl font-bold">Account</DialogTitle>
                        <DialogDescription className="text-gray-400 text-md">Manage your account information</DialogDescription>
                      </DialogHeader>
                      <DialogDescription className="text-white text-lg pt-2 ">Profile</DialogDescription>
                      <DialogDescription className="flex items-center space-x-2">
                        <img src={userData.avatar_url} alt="User Avatar" className="w-14 h-14 rounded-full" />
                        <DialogDescription className="pl-2 text-md">
                          <DialogDescription className="text-white font-bold">{userData.name}</DialogDescription>
                          <DialogDescription className="text-gray-400">{userData.login}</DialogDescription>
                        </DialogDescription>
                      </DialogDescription>
                      <Separator />
                      <DialogHeader className="text-white text-lg mb-0">Location</DialogHeader>
                      <DialogDescription className="text-gray-400">{userData.location}</DialogDescription>
                      <Separator />

                      <DialogHeader className="text-white text-lg mb-0">Email Addresses</DialogHeader>
                      <DialogDescription className="text-gray-400">{userData.email}</DialogDescription>
                      <Separator />

                      <DialogHeader className="text-white text-lg mb-0">Connected Accounts</DialogHeader>
                      <DialogDescription className="flex items-center text-gray-400">
                        <BsGithub className="mr-3 text-lg" />
                        <span>{userData.login}</span>
                      </DialogDescription>

                      <Separator />

                      <DialogDescription className="flex justify-between items-center text-gray-300 w-full">
                        <DialogDescription className="pb-2">
                          <DialogDescription className="text-white text-[1.1rem]">Delete your account</DialogDescription>
                          <DialogDescription className="text-gray-400">Delete your account and all its associated data.</DialogDescription>
                        </DialogDescription>
                        <button
                          onClick={handleLogout}
                          className="text-red-500 border border-red-500  px-3 py-1 transition duration-200 ease-in-out hover:bg-red-500 hover:text-white"
                        >
                          Delete Account
                        </button>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </DropdownMenu>
              ) : (
                <Link to="https://github.com/developerrahulofficial" className="px-2 sm:px-4 py-2 block font-bold text-white login-button">
                  created for ❤️ by Developer Rahul
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search isAuthenticated={isAuthenticated} />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignIn" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
