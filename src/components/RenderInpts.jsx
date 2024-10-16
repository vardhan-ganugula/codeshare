import React, { useEffect, useRef, useState } from 'react'

function RenderInpts({length, handleCode}) {

    const [inpts, setInpts] = useState(new Array(length).fill(""));

    const inptsRef = useRef([]);
  
    const handleChange = (e, indx) => {
      // getting the input value
      const value = e.value.trim();
      // checking if it is a number or not
      if(isNaN(value) || value === '') return;
      // copy the useState and new update the state
      let newVal = [...inpts];
      newVal[indx] = value[value.length - 1];
      setInpts(newVal);
      // check for the input is last or not, if not return else focus the next element
      if(indx < length -1){
        e.nextElementSibling.focus()
      }
      //  check if the otp forms the length then call the callback function
      const totalOtp = newVal.join("")
      if(totalOtp.trim().length === length){
        handleCode(totalOtp)
      }
    };
    const handleKeydown = (e, indx) => {
      if(e.key === 'Backspace'){
        let newVal = [...inpts];
          newVal[indx] = "";
          setInpts(newVal);
        if(indx > 0){
          e.target.previousElementSibling.focus();
        }
      }
    }
    
    useEffect(()=> {
        inptsRef.current[0].focus()
    }, [])

  return (
    <div className="flex gap-2">
        {inpts.map((inpt, indx) => (
          <input
            type="text"
            className="w-7 h-10 rounded border-indigo-300 text-center border-2 outline-none focus:border-indigo-500"
            key={indx}
            value={inpts[indx]}
            onChange={(e) => handleChange(e.target, indx)}
            onKeyDown={(e) => handleKeydown(e,indx)}
            ref={(reference) => inptsRef.current[indx] = reference}
          />
        ))}
      </div>
  )
}

export default RenderInpts