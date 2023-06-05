import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/custom.css";
import "./index.css";

//ROUTER
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

//CONTEXT
import SessionProvider from "./context/sessionContext";

//FONTAWESOME
import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
