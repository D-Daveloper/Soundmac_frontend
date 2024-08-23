import React from "react";
import heroperson from "../assets/images/heroperson.webp";
import heroalbum from "../assets/images/hero_album.webp";
import hero_bg from "../assets/images/hero_bg.webp";

const Hero = () => {
  return (
    <section>
      <div className="grad img relative flex h-[600px] max-w-full justify-between overflow-hidden">
        <img src={heroperson} alt="" className="z-20" />
        <img src={heroalbum} alt="" className="z-20" />
        <img src={hero_bg} alt="" className="absolute h-full w-full" />
        <div className="absolute bottom-0 left-[0%] top-0 z-30 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50 text-center text-4xl text-white text-opacity-100 max-md:text-2xl">
          <p className="font-semibold leading-normal">Stay Tuned</p>
          <p className="font-semibold leading-normal">
            with the Latest Music Trends
          </p>
          <p className="max-w-xl text-center text-lg font-medium leading-normal max-md:text-sm">
            Discover new artists, tracks, and industry updates. Your one-stop
            destination for all things music
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
