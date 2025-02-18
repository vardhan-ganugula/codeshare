import { format } from "date-fns";
import { QrComponent } from "./";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuDot } from "react-icons/lu";

export default function Sidebar({ textCode, time, textInfo, shouldUpdate }) {
  const [qrCode, setQrcode] = useState(null);
  const [extension, setExtension] = useState("txt");
  useEffect(() => {
    QRCode.toDataURL(window.location.href).then(setQrcode);
  }, []);
  const navigate = useNavigate();
  const generateCode = () => {
    let textBlob = new Blob([textInfo], { type: "text/plain" });
    let fileURL = URL.createObjectURL(textBlob);
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", fileURL);
    downloadElement.download = Date.now() + "." + extension;
    downloadElement.click();
  };
  return (
    <aside className="md:w-[350px] p-2 md:h-full border-r-2 border-zinc-100 flex-shrink-0 w-full border-2">
      <div className="flex flex-col gap-3 bg-white shadow rounded p-2">
        <div>
          <span className="text-start font-bold text-xl text-indigo-600">
            Created at :
          </span>
          <span> {format(time, "yyyy-MM-dd HH:mm:ss")}</span>
        </div>
        <div>
          <span className="text-start font-bold text-xl text-indigo-600">
            Code :
          </span>
          <span> {textCode}</span>
        </div>
      </div>
      <div className="w-full shadow p-2 mt-2">
        <h1 className="w-full py-3 bg-indigo-500 rounded text-center font-bold text-xl text-white">
          Qr Code
        </h1>
        <QrComponent qrCode={qrCode} />
      </div>
      <div className="w-full  p-3 gap-2 shadow flex items-center">
        <div className="h-full px-2 py-2 text-black flex items-center">
          <LuDot size={20} />
          <input
            type="text"
            className="w-10 outline-none"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
          />
        </div>
        <button
          onClick={generateCode}
          className="flex-grow text-center py-2 rounded shadow bg-violet-500 text-white"
        >
          Download Code
        </button>
      </div>
      {shouldUpdate && (
        <div className="w-full  p-3 gap-2 shadow flex items-center">
          <button
            className="text-center py-2 rounded shadow bg-sky-500 tracking-wider text-lg text-white w-full"
            disabled={!shouldUpdate}
            onClick={(e) => navigate(`/edit/${textCode}`)}
          >
            edit
          </button>
        </div>
      )}
    </aside>
  );
}
