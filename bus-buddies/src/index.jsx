import "../global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
