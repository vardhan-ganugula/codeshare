import React from "react";
import People from "../assets/people.png";
import OpenImg from "../assets/open.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TextForm } from "./";
import { useNavigate } from "react-router-dom";

function HomepageMain() {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-100 h-screen w-full overflow-hidden">
      <div className="h-full w-full flex items-center justify-center flex-col md:flex-row gap-3 p-3">
        <section className="card">
          <img
            src={People}
            alt="create a page"
            className="w-1/3 h-1/3 object-cover aspect-square"
          />
          <h1 className="text-2xl text-indigo-500 font-bold">create a page</h1>
          <button className="mt-5 bg-indigo-500 rounded text-white text-bold px-9 py-2" onClick={()=> navigate('/create')}>
            create
          </button>
        </section>
        <section className="font-bold text-xl text-red-400 flex gap-2 items-center">
          <FaChevronLeft size={20} /> or <FaChevronRight size={20} />
        </section>
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
