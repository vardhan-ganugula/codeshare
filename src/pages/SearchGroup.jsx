import React, { useCallback, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import axiosProfile from "../utils/axiosProfile";
import { useDebounce } from "../utils/utils";
import { Link } from "react-router-dom";

const SearchGroup = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [groups, setGroups] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([]);
  const handleSearch = useDebounce(async (value) => {
    if (!value.trim()) {
      setGroups([]);
      return;
    }
    try {
      const { data } = await axiosProfile.get(`/search-group?search=${value}`);
      setGroups(data.groups);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
    setGroups([]);
  };

  const handleSelectGroup = (group) => {
    console.log(group);
    setSearchResults(group.textCodes);
    setTitles(group.textTitles)
  };
  return (
    <main className="min-h-screen p-12 bg-gray-100">
      <section className="flex items-start justify-center h-80">
        <div
          className={`flex flex-col items-center shadow-lg w-[500px] min-h-12 rounded-lg border-2 p-1 transition-height duration-300  ${
            isFocused ? "border-blue-500" : "border-white"
          } bg-white`}
        >
          <div className="flex items-center w-full border-b">
            <span
              className={`pl-3 transition-colors duration-200 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <IoSearchSharp size={25} />
            </span>

            <input
              type="text"
              placeholder="Search group by name"
              className="p-2 bg-transparent w-full outline-none"
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleSearchChange}
            />

            {search.length > 0 && (
              <button className="p-2" onClick={clearSearch}>
                <IoMdClose size={20} className="text-blue-500" />
              </button>
            )}
          </div>

          {(isFocused || groups.length) > 0 && (
            <div className="flex flex-col p-2 w-full max-h-64 overflow-y-auto">
              {groups.length === 0 ? (
                <div className="w-full text-center border-b p-2">
                  <span className="text-gray-400">No group found</span>
                </div>
              ) : (
                groups.map((group) => (
                  <div
                    className="flex gap-2 border-b p-2 hover:bg-slate-50 cursor-pointer "
                    key={group._id}
                    onClick={() => handleSelectGroup(group)}
                  >
                    <span className="w-20 text-blue-500">
                      {group.groupCode}
                    </span>
                    <span className="text-blue-500">{group.name}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
      {searchResults && searchResults.length > 0 && (
        <section>
          <table className="w-full border-collapse shadow-lg bg-white">
            <thead>
              <tr className="bg-white border-b-2 border-blue-600">
                <th className="p-3 text-left font-semibold cursor-pointer text-blue-600 bg-white hover:text-white hover:bg-blue-600 transition-colors duration-200 w-40 ">
                  TextCode
                </th>
                <th className="p-3 text-left font-semibold cursor-pointer  text-blue-600 bg-white hover:text-white hover:bg-blue-600 transition-colors duration-200">
                  URL
                </th>
                <th className="p-3 text-left font-semibold cursor-pointer  text-blue-600 bg-white hover:text-white hover:bg-blue-600 transition-colors duration-200">
                  Title
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults &&
                searchResults.length > 0 &&
                searchResults.map((textCode, indx) => (
                  <tr
                    key={indx}
                    className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                      indx % 2 === 0 ? "bg-white" : "bg-gray-50 w-20"
                    }`}
                  >
                    <td className="p-4 border-r">{textCode}</td>
                    <td className="p-4 border-r">
                        <a target="_blank" href={`/view?code=${textCode}`}>{import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 4)}view?code={textCode}</a>
                    </td>
                    <td>
                      <span>
                        {
                          titles[indx]
                        }
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
};

export default SearchGroup;
