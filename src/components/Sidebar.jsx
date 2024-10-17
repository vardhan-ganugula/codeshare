import { format } from "date-fns";
import { QrComponent } from "./";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sidebar({ textCode, time,textInfo}) {
  const [qrCode, setQrcode] = useState(null);
  useEffect(() => {
    QRCode.toDataURL(window.location.href).then(setQrcode);
  }, []);

  const generateCode = () => {
    let textBlob = new Blob([textInfo], { type: "text/plain" });
    let fileURL = URL.createObjectURL(textBlob);
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", fileURL);
    downloadElement.setAttribute("download", "textShare");
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
      <div className="w-full p-3 shadow">
        <button
          onClick={generateCode}
          className="w-full text-center py-2 rounded shadow bg-violet-500 text-white"
        >
          Download Code
        </button>
      </div>
    </aside>
  );
}
