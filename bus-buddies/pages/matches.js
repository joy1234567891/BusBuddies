import React from "react";
import NavigationBar from "../components/ui/navigationbar";

export default function Matches() {
  return (
    <div>
      <NavigationBar />
      <main>
        <section>
          <h1>On Your Route</h1>
          <p>Here are some people who are on your route!</p>
          <div>
            <span>
              Change of plans?
            </span>
            <button>Switch to a different route</button>
          </div>
        </section>
        <UserCards />
      </main>
    </div>
  );
}
    