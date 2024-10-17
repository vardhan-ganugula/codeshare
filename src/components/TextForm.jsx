import React, { useState } from "react";
import { RenderInpts } from "./";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function TextForm() {
  const [code, setCode] = useState();
  let length = 4;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code?.length == length) {
      console.log(code);
    } else {
      toast.warning("Not a valid code");
    }
  };
  const handleNavigate = () => {
    if(code.length == 4){
      navigate('/view?code='+code)
    }else{
      toast.error('not the code properly')
    }
  }
  const handleCode = (otp) => {
    setCode(otp);
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <RenderInpts length={length} handleCode={handleCode} />
      <button
        type="submit"
        className="mt-5 bg-indigo-500 rounded text-white text-bold px-9 py-2"
        onClick={handleNavigate}
      >
        open
      </button>
    </form>
  );
}

export default TextForm;
