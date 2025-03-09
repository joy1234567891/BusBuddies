import React from "react";
import "./style.css";

export const Auth = () => {
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

            <div className="text-wrapper-4">Continue</div>
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
