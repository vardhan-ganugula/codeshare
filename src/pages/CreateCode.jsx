import React, { useRef, useState } from "react";
import { Header, Footer } from "../components/";
import { toast } from "react-toastify";
import axiosProfile from "../utils/axiosProfile";

function CreateCode() {
  const codeRef = useRef();
  const [codeText, setCodetext] = useState("write you text here");
  const [code, setCode] = useState("");
  const handleTextCode = (e) => {
    const text = e.target.value;
    if (isNaN(text)) {
      return;
    } else {
      if (text.length > 4) {
        setCode(text.substring(text.length - 4, text.length));
      } else {
        setCode(text);
      }
    }
  };
  const handleCreateCode = async(e) => {
    e.preventDefault();
    if (code.length != 4) {
      toast.error("code must atleat 4 digit");
      return;
    }
    try {
      const response = await axiosProfile.post("/create-text", {
          textInfo : codeText,
          textCode : code
      });
      // console.log(response)
      if(response.data.status == 'success'){
        toast.success(response.data.msg)
      }else{
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <Header />
      <main className="md:h-[87vh] h-screen w-full p-2 flex flex-col gap-2 md:flex-row">
        <aside className="md:w-[350px] w-full p-2 md:h-full border-r-2 border-gray-100 ">
          <form className="w-full shadow rounded" onSubmit={handleCreateCode}>
            <h1 className="bg-indigo-500 py-2 text-center rounded text-white">
              Create Code
            </h1>
            <div className="w-full p-3 flex gap-2">
              <input
                type="text"
                className="h-10 flex-shrink-0 w-2/3 p-2 rounded border-indigo-300 focus:border-indigo-500 outline-none border-2 text-center"
                value={code}
                onChange={handleTextCode}
                placeholder="enter the 4 digit code"
              />
              <button
                type="submit"
                className="text-white rounded bg-indigo-500 w-full py-2 flex-grow-0"
              >
                create
              </button>
            </div>
          </form>
        </aside>
        <section className="w-full flex-grow h-full">
          <textarea
            className="w-full h-full outline-none p-3"
            value={codeText}
            onChange={(e) => setCodetext(e.target.value)}
          ></textarea>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CreateCode;
