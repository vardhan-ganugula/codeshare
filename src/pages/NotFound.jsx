import React from "react";
import NotFoundGIF from "../assets/notfound.gif";
const NotFound = () => {
  return (
    <main className="h-screen w-full flex justify-center items-center gap-10">
      <div className="w-1/3 h-[500px]">
        <img
          src={NotFoundGIF}
          alt="404"
          className="w-full h-full aspect-square object-cover"
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center gap-5 pl-10">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-bold">UH OH ! You're Lost</h2>
        <div className="w-[350px] font-semibold text-center">
          <p className="text-gray-800">
            The page you are looking for does not exist.
          </p>
          <p className="text-gray-800">
            How you got here is a mystery. But you can click on the button below
            to go back to the home page
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
