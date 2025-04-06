import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import DetailsPage from "../pages/DetailsPage.jsx";
import ListingPage from "../pages/ListingPage.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Declare the path to each page */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Default page */}
          <Route index element={<ListingPage />} />

          {/* Have :id  as params*/}
          <Route path="/details/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
