import React from "react";
import "./signup.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleContinueClick = () => {
    router.push("/profile");
  };

  return (
    <div className="auth">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="text-wrapper">Log In</div>

          <div className="div">Student Email</div>

          <div className="text-wrapper-2">Enter your @student.ubc.ca email</div>

          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/xCEhhcCJ/img/rectangle-14.svg"
          />

          <div className="overlap">
            <div className="rectangle-2" />

            <button className="text-wrapper-4 custom-button" onClick={handleContinueClick}>Continue</button>
          </div>

          <div className="text-wrapper-5">Password</div>

          <img
            className="img"
            alt="Rectangle"
            src="https://c.animaapp.com/xCEhhcCJ/img/rectangle-14.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login