import React, { useEffect, useRef, useState } from "react";
import { Header, Footer } from "../components/";
import { toast } from "react-toastify";
import axiosProfile from "../utils/axiosProfile";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/socket";

function EditCode() {
  const [codeText, setCodetext] = useState("write you text here");
  const { code } = useParams();
  const navigate = useNavigate();
  const [isSync, setSync] = useState(false)
  const handleSync = (e) => {
    setSync(e.target.checked)
  }
  async function getText(code) {
    try {
      const response = await axiosProfile.get("/view-text", {
        params: {
          code,
        },
      });
      if (response.data.status === "success") {
        setCodetext(response.data.data.textInfo);
      } else {
        toast.error(response.data.msg);
        toast.info("redirecting in 2seconds");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }
  useEffect(() => {
    getText(code);
  }, [code]);

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", { code });
    return () => {
      socket.off("join_room");
      socket.disconnect();
    };
  }, []);
  const handleRoomUpdate = () => {
    socket.emit("send_message", { code, message: codeText });
  };
  const handleUpdateCode = async (e) => {
    e.preventDefault();
    handleRoomUpdate();
    if (code.length != 4) {
      toast.error("code must atleat 4 digit");
      return;
    }
    try {
      const response = await axiosProfile.post("/update-text", {
        textInfo: codeText,
        textCode: code,
      });
      // console.log(response)
      if (response.data.status == "success") {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if(isSync){
    handleRoomUpdate();
  }
  return (
    <>
      <Header />
      <main className="md:h-[87vh] h-auto w-full p-2 flex flex-col gap-2 md:flex-row">
        <aside className="md:w-[350px] w-full p-2 md:h-full border-r-2 border-gray-100 ">
          <form className="w-full shadow rounded" onSubmit={handleUpdateCode}>
            <h1 className="bg-indigo-500 py-2 text-center rounded text-white">
              Update Text
            </h1>
            <div className="w-full p-3 flex gap-2">
              <input
                type="text"
                className="h-10 flex-shrink-0 w-2/3 p-2 rounded border-indigo-300 focus:border-indigo-500 outline-none border-2 text-center"
                value={code}
                disabled
              />
              <button
                type="submit"
                className="text-white rounded bg-indigo-500 w-full py-2 flex-grow-0"
              >
                update
              </button>
            </div>
            <div className="w-full p-3 flex gap-2 items-center">
              <div>
                Sync Text :
              </div>
              <div>
                <input
                  type="checkbox"
                  name="updateMessage"
                  id="updateMessage"
                  hidden
                  onChange={handleSync}
                />
                <label htmlFor="updateMessage" className={`w-[60px] h-7 rounded-full bg-white inline-block relative p-1 cursor-pointer border-2 ${isSync ? 'border-indigo-400' : 'border-gray-400'} `}>
                  <span className={`inline-block absolute w-5 h-5 rounded-full top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isSync ? 'translate-x-7 bg-indigo-400' : 'translate-x-0 bg-gray-300'}`}></span>
                </label>
              </div>
            </div>
          </form>
        </aside>
        <section className="w-full flex-grow md:h-full sm:min-h-[50vh]">
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

export default EditCode;
