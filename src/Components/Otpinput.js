import React, { useState, useRef } from "react";

const OtpInput = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [otp, setOTP] = useState(new Array(6).fill(''));
  const inputRefs = useRef(Array(6).fill(null));

  const focusInput = (index) => {
    if (inputRefs.current[index] && inputRefs.current[index].focus) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < 5 && value !== "") {
      focusInput(index + 1);
    }
    setVerificationCode(newOTP.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      focusInput(index - 1);
      setVerificationCode(newOTP.join(''));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOTP = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOTP[i] = pastedData[i];
    }
    setOTP(newOTP);
    setVerificationCode(newOTP.join(''));
    focusInput(pastedData.length);
  };

  const handleVerification = () => {
    // Simulate verification logic
    if (verificationCode === "123456") {
      console.log("Verification successful!");
    } else {
      console.log("Verification failed!");
    }
  };

  const handleResend = () => {
    // Simulate resend logic
    console.log("Resending code...");
    // Reset OTP input fields
    setOTP(new Array(6).fill(''));
    // Reset verification code
    setVerificationCode('');
    // Focus on the first input field
    focusInput(0);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify</h1>
          <p>Your code was sent to you via phone</p>
        </div>

        <div className="flex justify-center items-center">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              className="w-12 h-12 m-2 text-center border rounded focus:outline-none"
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded mr-4"
            onClick={handleVerification}
          >
            Verify
          </button>
          <button
            className="text-blue-500 underline"
            onClick={handleResend}
          >
            Request again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
