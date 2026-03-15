import React from "react";

const Home = () => {
  return (
    <div>
      <div className="h-screen w-screen bg-[url('/homebg.jpg')] bg-cover p-0 m-0 flex items-center justify-center">
        <img
          src="logo.outline.svg"
          alt=""
          draggable="false"
          className="h-[50vh] pl-4 absolute"
        />
      </div>
    </div>
  );
};

export default Home;
