import React, { useState, useRef } from "react";

const Otpinput = ({ length = 6 }) => {
  const [otp, setOTP] = useState(new Array(length).fill(""));
  const inputRefs = useRef(Array(length).fill(null));

  const focusInput = (index) => {
    if (inputRefs.current[index] && inputRefs.current[index].focus) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < length - 1 && value !== "") {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const newOTP = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOTP[i] = pastedData[i];
    }
    setOTP(newOTP);
    focusInput(pastedData.length);
  };

  return (
    <div className="bg-black h-svh">
      <div className="flex justify-center pt-80 items-center">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            style={{ animationDelay: ` ${index * 2}s` }}
            className="w-12 h-12 customInput text-center bg-transparent focus:outline-none rounded"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
          />
        ))}

        <p className="text-white">
          {otp.map((value, index) => (
            <em>{value}</em>
          ))}
        </p>
      </div>
     
     
    </div>
  );
};

export default Otpinput;
