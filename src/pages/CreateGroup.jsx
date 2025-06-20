import React, { useCallback } from "react";
import { FaRegObjectUngroup } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoAddCircleOutline, IoKey } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import axiosProfile from "../utils/axiosProfile";
import { BiSolidTrash } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {Table} from "../components/";

const CreateGroup = () => {
  const [formData, setFormData] = React.useState({
    groupName: "",
    groupCode: "",
    groupDescription: "",
  });
  const [textCodes, setTextCodes] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const debounce = useCallback((func, time) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), time);
    };
  }, []);

  const handleSearch = useCallback(async (val) => {
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const resp = await axiosProfile.get(`/search?value=${val}`);
      if (resp.data.data.length === 0) {
        toast.warning("No results found");
      }
      setSearchResults(resp.data.data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, [setFormData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.groupName || !formData.groupCode) {
      toast.error("Group name and code are required");
      return;
    }
    if (textCodes.length === 0) {
      toast.error("Please select at least one text code");
      return;
    }

    setLoading(true);

    try {
      const resp = await axiosProfile.post("/create-group", {
        name: formData.groupName,
        groupCode: formData.groupCode,
        description: formData.groupDescription,
        textCodes
      });
      if (resp.data.status !== "success") {
        toast.error(resp.data.message);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }

    toast.success("Group created successfully!");
  }, [formData, textCodes]);

  const debounceSearch = useCallback(debounce(handleSearch, 500),[]);



  const handleAddTextCode = useCallback( (textCode) => {
    if (textCodes.includes(textCode)) {
      toast.warning("This text code is already selected");
      return;
    }
    setTextCodes((prev) => [...prev, textCode]);
    toast.success("Text code added successfully");
  },[textCodes, setTextCodes]);

  const handleRemoveTextCode = useCallback((textCode) => {
    setTextCodes((prev) => prev.filter((code) => code !== textCode));
    toast.success("Text code removed successfully");
  }, [setTextCodes]);

  const handleUpdateGroupCode = useCallback((e) => {
    const value = e.target.value;
    if (value.match(/^[0-9]*$/)) {
      let val = formData.groupCode + value;
      if (val.length > 5) {
        val = val.substring(val.length - 5, val.length);
      }
      setFormData((prev) => ({
        ...prev,
        groupCode: val,
      }));
    }
  },[setFormData, formData.groupCode]);
  return (
    <main className="w-full min-h-[90vh] bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Form Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRegObjectUngroup className="text-blue-500 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Group
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="groupName"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Group Name
                </label>
                <div className="relative">
                  <MdOutlineDriveFileRenameOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="groupName"
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleInputChange}
                    placeholder="Enter group name"
                    className="pl-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="groupCode"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Group Code
                </label>
                <div className="relative">
                  <IoKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="groupCode"
                    name="groupCode"
                    value={formData.groupCode}
                    onChange={handleUpdateGroupCode}
                    placeholder="Enter group code"
                    className="pl-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="groupDescription"
                className="text-sm font-medium text-gray-700 block"
              >
                Group Description
              </label>
              <div className="relative">
                <FaPen
                  className="absolute top-3 left-3 text-gray-400"
                  size={13}
                />
                <textarea
                  id="groupDescription"
                  name="groupDescription"
                  value={formData.groupDescription}
                  onChange={handleInputChange}
                  placeholder="Enter group description"
                  rows={4}
                  className="pl-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="textCode"
                className="text-sm font-medium text-gray-700 block"
              >
                Search Text Codes
              </label>
              <div className="relative">
                <CiSearch
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type="search"
                  id="textCode"
                  placeholder="Search for text codes..."
                  onChange={(e) => debounceSearch(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Selected Text Codes */}
            {textCodes.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Text Codes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {textCodes.map((code) => (
                    <div
                      key={code}
                      className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border shadow-sm"
                    >
                      <span className="text-sm text-gray-700">{code}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTextCode(code)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <BiSolidTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin text-light">
                  <AiOutlineLoading3Quarters size={20} />
                </div>
              ) : (
                <>
                  <IoAddCircleOutline size={20} />
                </>
              )}
              Create Group
            </button>
          </form>
        </section>

        {/* Search Results Table */}
        {searchResults && searchResults.length > 0 && (
          <Table
            name="Search Results"
            results={searchResults}
            textCodes={textCodes}
            enableAddText={true}
            handleAddTextCode={handleAddTextCode}
          />
        )}
      </div>
    </main>
  );
};

export default CreateGroup;
