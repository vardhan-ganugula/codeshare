import React from "react";
import People from "../assets/people.png";
import Group from "../assets/group1.jpg";
import OpenImg from "../assets/open.svg";
import Search from "../assets/search.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TextForm } from "./";
import { useNavigate } from "react-router-dom";

function HomepageMain() {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-100 min-h-screen w-full overflow-hidden md:p-10 ">
      <div className="h-full w-full flex items-center justify-center flex-col md:flex-row gap-3 p-3">
        <section className="card">
          <img
            src={People}
            alt="create a page"
            className="w-1/3 h-1/3 object-cover aspect-square"
          />
          <h1 className="text-2xl text-indigo-500 font-bold">create a page</h1>
          <button
            className="mt-5 bg-indigo-500 rounded text-white text-bold px-9 py-2"
            onClick={() => navigate("/create")}
          >
            create
          </button>
        </section>

        <div className="font-bold text-xl text-red-400 flex flex-col gap-2 items-center">
          <section className="card">
            <img
              src={Group}
              alt="create a page"
              className="w-1/2 h-1/2 object-cover aspect-square"
            />
            <h1 className="text-2xl text-indigo-500 font-bold">
              create a group
            </h1>
            <button
              className="mt-5 bg-indigo-500 rounded text-white text-bold px-9 py-2"
              onClick={() => navigate("/create-group")}
            >
              create
            </button>
          </section>

          <section className="card">
            <img
              src={Search}
              alt="open a page"
              className="w-1/2 h-1/2 object-cover aspect-square"
            />
            <h1 className="text-2xl text-indigo-500 font-bold">search a group</h1>
            <button
              className="mt-5 bg-indigo-500 rounded text-white text-bold px-9 py-2"
              onClick={() => navigate("/search-group")}
            >
              Search
            </button>
          </section>
        </div>
        <section className="card h-full">
          <img
            src={OpenImg}
            alt="open a page"
            className="w-1/3 h-1/3 object-cover aspect-square"
          />
          <h1 className="text-2xl text-indigo-500 font-bold">open a page</h1>
          <TextForm />
        </section>
      </div>
    </main>
  );
}

export default HomepageMain;
