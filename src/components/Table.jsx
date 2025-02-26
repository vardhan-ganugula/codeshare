import React from "react";
import { FaRegSquarePlus, FaSort } from "react-icons/fa6";

const Table = ({name, handleSort, searchResults, handleAddTextCode, textCodes}) => {
  if (searchResults && searchResults.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{name}</h2>
        <div className="flex items-center justify-center h-48">
          <span className="text-gray-400">No data found</span>
        </div>
      </section>
    );
  }else
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{name}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th
                className="p-3 text-left font-semibold cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleSort("textCode")}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaSort />
                  <span>TextCode</span>
                </div>
              </th>
              <th
                className="p-3 text-left font-semibold cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleSort("textName")}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaSort />
                  <span>TextName</span>
                </div>
              </th>
              <th className="p-3 text-left font-semibold">
                <div className="flex items-center justify-center">
                  <span>TextInfo</span>
                </div>
              </th>
              <th
                className="p-3 text-left font-semibold cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleSort("updatable")}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaSort />
                  <span>Updatable</span>
                </div>
              </th>
              <th className="p-3 text-left font-semibold">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((row, index) => (
              <tr
                key={row.textCode}
                className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 border-r">{row.textCode}</td>
                <td className="p-4 border-r">{row.textName}</td>
                <td className="p-4 border-r">
                  <div className="max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.textInfo}
                  </div>
                </td>
                <td className="p-4 border-r text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      row.updatable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.updatable ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    type="button"
                    onClick={() => handleAddTextCode(row.textCode)}
                    className="text-blue-500 hover:text-blue-700 transition-colors p-2"
                    disabled={textCodes.includes(row.textCode)}
                  >
                    <FaRegSquarePlus size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default React.memo(Table);
