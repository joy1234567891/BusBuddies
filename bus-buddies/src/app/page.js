"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const handleLogInClick = () => {
    router.push("/login");
  };

  return (
    <div className="home">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
              <img
                className="vector"
                alt="Vector"
                src="https://c.animaapp.com/NBypBccO/img/vector-2.svg"
              />

              <img
                className="img"
                alt="Vector"
                src="https://c.animaapp.com/NBypBccO/img/vector-1.svg"
              />

              <div className="text-wrapper">BusBuddies</div>
            </div>
          </div>

          <div className="div">
            <p className="p">Find someone to bus home with!</p>

            <div className="overlap-group-wrapper">
              <div className="overlap-2">
                <div className="rectangle" />
                <button className="text-wrapper-2 custom-button" onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>

            <div className="div-wrapper">
              <div className="overlap-2">
                <div className="rectangle-2" />
                <button className="text-wrapper-2 custom-button" onClick={handleLogInClick}>Log In</button>
              </div>
            </div>
          </div>

          <div className="overlap-3">
            <div className="text-wrapper-4">Instant Connection</div>

            <p className="text-wrapper-5">
              Take the bus home with a new friend!
            </p>
          </div>

          <div className="group-2">
            <div className="overlap-2">
              <div className="rectangle" />

              <button className="text-wrapper-2 custom-button" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>

          <div className="group-3">
            <div className="overlap-2">
              <div className="rectangle-2" />

              <button className="text-wrapper-2 custom-button" onClick={handleLogInClick}>Log In</button>
            </div>
          </div>

          <div className="text-wrapper-6">Why use BusBuddies?</div>

          <div className="text-wrapper-7">Ready to roll?</div>

          <div className="overlap-4">
            <div className="text-wrapper-4">Find Common Ground</div>

            <p className="text-wrapper-5">
              Meet people with similar interests.
            </p>
          </div>

          <div className="overlap-5">
            <div className="text-wrapper-4">Power in Numbers</div>

            <p className="text-wrapper-5">
              Leaving late? Stay safe with your transit buddy.
            </p>
          </div>

          <div className="overlap-6">
            <div className="text-wrapper-4">Students Only</div>

            <p className="text-wrapper-5">
              UBC student email authentication required for sign up.
            </p>
          </div>

          <div className="overlap-7">
            <div className="text-wrapper-4">Save Time</div>

            <p className="text-wrapper-8">
              You’re taking the bus anyways — why not make new friends on the
              way?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};