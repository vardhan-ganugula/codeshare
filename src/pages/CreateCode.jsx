import React, { useState } from "react";
import { Header, Footer } from "../components/";
import { toast } from "react-toastify";
import axiosProfile from "../utils/axiosProfile";
import { format } from "date-fns";

function CreateCode() {
  const [codeText, setCodetext] = useState("write you text here");
  const [code, setCode] = useState("");
  const [textName, setTextName] = useState('')
  const [shouldUpdate, setShouldupdate] = useState(true)

  const [expiryDate, setExpireDate] = useState(Date.now() + 365*24*60*60*1000)




  const handleUpdateDate = (e) => {

    const newDate = (new Date(e.target.value).getTime())
    if(newDate < Date.now()){
      toast.error('date must be greater than today')
      return
    }
    setExpireDate(newDate)

  }


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

  
  const handleCreateCode = async (e) => {
    e.preventDefault();
    if (code.length != 4 ) {
      toast.error("code must atleat 4 digit");
      return;
    }
    if(!textName) {
      toast.error('name is required')
    }
    try {
      const response = await axiosProfile.post("/create-text", {
        textInfo: codeText,
        textCode: code,
        shouldUpdate,
        textName,
        expiryDate
      });
      // console.log(response)
      if (response.data.status == "success") {
        toast.success(response.data.msg);
        // console.log(response.data)
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <main className="md:h-[87vh] h-auto w-full p-2 flex flex-col gap-2 md:flex-row">
        <aside className="md:w-[350px] w-full p-2 md:h-full border-r-2 border-gray-100 ">
          <form className="w-full shadow rounded" onSubmit={handleCreateCode}>
            <h1 className="bg-indigo-500 py-2 text-center rounded text-white">
              Create Code
            </h1>
            <div className="w-full p-3 flex gap-2">
              <h4 className="text-white rounded bg-indigo-500 w-full py-2 flex-grow-0 text-center text-md">
                Name
              </h4>
              <input
                type="text"
                className="h-10 flex-shrink-0 w-2/3 p-2 rounded border-indigo-300 focus:border-indigo-500 outline-none border-2 text-center"
                value={textName}
                name="textname"
                onChange={(e) => setTextName(e.target.value)}
                placeholder="enter a unique name"
              />
            </div>
            <div className="w-full p-3 flex gap-2">
              <h4 className="text-white rounded bg-indigo-500 w-full py-2 text-center text-md">
                Expiry
              </h4>
              <input
                type="date"
                className="h-10 p-2 rounded border-indigo-300 focus:border-indigo-500 outline-none border-2 text-center"
                value={format(expiryDate, "yyyy-MM-dd")}
                name="textname"
                onChange={handleUpdateDate}
                placeholder="enter a unique name"
              />
            </div>
            <div className="w-full p-3 flex gap-2 items-center">
              <div>
                Update Message :
              </div>
              <div>
                <input
                  type="checkbox"
                  name="updateMessage"
                  id="updateMessage"
                  hidden 
                  checked={shouldUpdate}
                  onChange={(e) => setShouldupdate(e.target.checked)}
                />
                <label htmlFor="updateMessage" className={`w-[60px] h-7 rounded-full bg-white inline-block relative p-1 cursor-pointer border-2 ${shouldUpdate ? 'border-indigo-400' : 'border-gray-400'} `}>
                  <span className={`inline-block absolute w-5 h-5 rounded-full top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${shouldUpdate ? 'translate-x-7 bg-indigo-400' : 'translate-x-0 bg-gray-300'}`}></span>
                </label>
              </div>
            </div>
            <div className="w-full p-3 flex gap-2">
              <input
                type="text"
                className="h-10 flex-shrink-0 w-2/3 p-2 rounded border-indigo-300 focus:border-indigo-500 outline-none border-2 text-center"
                value={code}
                name="textCode"
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
        <section className="w-full flex-grow md:h-full sm:min-h-[50vh]">
          <textarea
            className="w-full h-full outline-none p-3"
            name="textmessage"
            value={codeText}
            onChange={(e) => setCodetext(e.target.value)}
          ></textarea>
        </section>
      </main>
    </>
  );
}

export default CreateCode;
