import React from "react";
import NotFoundGIF from "../assets/notfound.gif";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen w-full flex md:flex-row flex-col justify-center items-center md:gap-10">
      <div className="md:w-1/3 h-[300px] md:h-[500px] bg-red-400">
        <img
          src={NotFoundGIF}
          alt="404"
          className="w-full h-full aspect-square object-cover"
        />
      </div>
      <div className="md:w-1/3 flex flex-col justify-center items-center gap-5 md:pl-10 pb-10">
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
          <button className="bg-blue-500 text-white px-5 py-3 text-sm rounded-md my-3"
          
          onClick={()=>{
            navigate('/')
          }}
          >
            Go back to the home page
          </button>

        </div>
      </div>
    </main>
  );
};

export default NotFound;
