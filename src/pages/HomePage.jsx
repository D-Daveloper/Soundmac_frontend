import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { home_post } from "../data/index";
import { ArrowLeft, ArrowRight, Heart, Share2 } from "lucide-react";
import "animate.css";
import { Link } from "react-router-dom";
import "../input.css";
// import AdComponent from "../components/adComponent";

const HomePage = () => {
  const savedPage = Number(localStorage.getItem("currentPage")) || 1;
  const [currentPage, setCurrentPage] = useState(savedPage);

  // Save currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = home_post.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(home_post.length / postsPerPage);

  return (
    <main className="bg-homebg">
      <div>
        <Hero />
      </div>
      <section className="">
        <div className="">
          <div className="mx-auto max-w-[70%] max-md:max-w-[90%] full">
            <h1 className="animate__animated animate__bounce my-11 text-4xl font-bold capitalize text-text">
              recent posts
            </h1>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {currentPosts.map((item) => (
                <Link to={`/post/${item.id}`}>
                  <article
                    key={item.id}
                    className="flex h-full rounded-2xl bg-white p-3 hover:shadow-lg"
                  >
                    <div className="flex flex-col justify-between gap-5 hover:cursor-pointer">
                      <div>
                        <img
                          src={item.imgURL}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <h2 className="font-semibold leading-normal text-text md:text-[2vw]">
                        {item.Title}
                      </h2>
                      <p className="text-sm">{item.time}</p>
                      <div className="flex items-baseline justify-between align-baseline text-base font-semibold">
                        <p className="flex gap-3 text-icon">
                          <button className="fill-none">
                            <Heart
                              stroke="#10414A"
                              className={"hover:scale-110 focus:scale-110"}
                            />
                          </button>
                          {item.likes}
                        </p>
                        <p className="flex gap-3 text-icon">
                          <button>
                            <Share2
                              stroke="#10414A"
                              className={"hover:scale-110 focus:scale-110"}
                            />
                          </button>
                          {item.shares}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </section>
          </div>
        </div>
        <div className="mx-auto flex max-w-[70%] justify-between gap-2 py-14 full">
          <button
            className="rounded-full border border-black p-3 hover:bg-icon hover:text-white max-md:p-2"
            onClick={() => {
              window.scrollTo(0, 500)
              setCurrentPage((prev) => Math.max(prev - 1, 1))}}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                className={
                  "rounded-full px-5 py-2 shadow-md hover:bg-icon hover:text-white max-md:px-4 max-md:py-1" +
                  (currentPage === num + 1
                    ? " bg-icon text-white"
                    : " bg-white text-black")
                }
                key={num + 1}
                onClick={() => {
                  window.scrollTo(0, 500)
                  setCurrentPage(num + 1)
                }}
                disabled={currentPage === num + 1}
              >
                {num + 1}
              </button>
            ))}
          </div>
          <button
            className="rounded-full border border-black p-3 hover:bg-icon hover:text-white max-md:p-2"
            onClick={() =>{
              window.scrollTo(0, 500)
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            } }
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </button>
        </div>
        <div className="mx-auto max-w-[70%] full">
          <h3 className="text-[1.5vw] font-semibold capitalize max-md:text-lg">
            dont miss a beat!
          </h3>
          <p className="text-sm">
            Subscribe to our newsletter <br />
            for the latest updates straight to your inbox.
          </p>
          <form action="" className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email Address"
              className="max-w-[60%] rounded-[5px] bg-icon bg-opacity-[20%] p-2 outline-icon max-md:max-w-full"
            />
            <button
              className="mb-44 max-w-[30%] rounded-[5px] bg-icon p-1 text-white hover:bg-opacity-[90%] max-md:max-w-full"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      {/* <AdComponent/> */}
    </main>
  );
};

export default HomePage;
