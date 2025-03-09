import React from "react";
import "./signup.css";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const handleContinueClick = () => {
    router.push("/profile");
  };

  return (
    <div className="auth">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="text-wrapper">First Up: Email Verification</div>

          <div className="div">Student Email</div>

          <p className="p">
            Keep an eye on your inbox! We’ll send you a link to confirm your
            identity.
          </p>

          <div className="text-wrapper-2">Enter your @student.ubc.ca email</div>

          <p className="text-wrapper-3">Must be at least 8 characters long</p>

          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/xCEhhcCJ/img/rectangle-14.svg"
          />

          <div className="overlap">
            <div className="rectangle-2" />

            <button className="text-wrapper-4 custom-button" onClick={handleContinueClick}>Continue</button>
          </div>

          <div className="text-wrapper-5">Set a password</div>

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

export default Signup