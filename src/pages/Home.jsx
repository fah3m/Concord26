import React from "react";
import BlobBackground from "../components/BlobBackground";
import About from "./About";

const Home = () => {
  return (
    <div className="h-1350 overflow-x-hidden">
      <BlobBackground />
      <div
        id="home"
        className="h-screen w-screen p-0 m-0 flex items-center justify-center"
      >
        <img
          src="logo.outline.svg"
          alt=""
          draggable="false"
          className="h-[50vh] max-sm:h-[70vw] max-sm:right-[10vw] right-[25vw] absolute"
        />

        <h1 className="absolute left-[10vh] bottom-[10vh] text-white/60 font-main text-8xl max-sm:text-6xl max-sm:left-[10vw] max-sm:bottom-[10vw]">
          CONCORD <br />
          <p className="text-xl text-white/50 pl-2 max-sm:text-xs max-sm:pl-0.75">
            rebirth of aahans <br /> left tit
          </p>
        </h1>

        <h2 className="font-abahaya absolute top-[5vh] right-[10vh] text-4xl text-white/60 underline max-sm:top-[12vh] max-sm:text-xl max-sm:right-[3vh]">
          calcutta boys' school
        </h2>
      </div>

      <div id="about">
        <About />
      </div>
    </div>
  );
};

export default Home;
