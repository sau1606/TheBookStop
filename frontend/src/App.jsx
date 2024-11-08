import React from "react";
import "./App.css";
import "./index.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-[#f1e6dc]">
      <Navbar  />
      <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-4 font-primary '>
        <Outlet />
      </main>
      <footer>Footer</footer>
      </div>
    </>
  );
}

export default App;