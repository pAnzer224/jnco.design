import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GraphicDesign from "./components/GraphicDesign";
import UIUX from "./components/UIUX";
import Contact from "./components/Contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="bg-[#F5F1E8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700&display=swap');
        
        @font-face {
          font-family: 'Chainprinter';
          src: url('/fonts/Chainprinter-Regular.ttf') format('truetype');
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && <Hero />}
      {currentPage === "graphic" && <GraphicDesign />}
      {currentPage === "uiux" && <UIUX />}
      {currentPage === "contact" && <Contact />}
    </div>
  );
}
