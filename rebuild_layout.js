const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('..', 'jnco.pipeline', 'src');

// 1. TimeDisplay.jsx
const timeDisplayContent = 
import React, { useState, useEffect } from 'react';

export default function TimeDisplay() {
  const [time, setTime] = useState({
    uk: '',
    ph: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const ukTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      
      const phTime = new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);

      setTime({ uk: ukTime, ph: phTime });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary/80 rounded-xl p-4 font-mono text-xs text-dark/80 tracking-widest uppercase flex flex-col gap-2">
      <div className="flex justify-between items-center gap-4">
        <span className="font-bold">UK</span>
        <span>{time.uk}</span>
      </div>
      <div className="flex justify-between items-center gap-4">
        <span className="font-bold">PH</span>
        <span>{time.ph}</span>
      </div>
    </div>
  );
}
;
fs.writeFileSync(path.join(targetDir, 'components', 'TimeDisplay.jsx'), timeDisplayContent);

// 2. SoundboardSidebar.jsx
const sidebarContent = 
import React from 'react';
import TimeDisplay from './TimeDisplay';
import { 
  House, 
  UploadSimple, 
  ArrowsDownUp, 
  Code, 
  Palette, 
  PaintBrush, 
  Notepad, 
  Database, 
  Terminal 
} from '@phosphor-icons/react';

const navItems = [
  { id: 'home', icon: House, label: 'Home' },
  { id: 'dropzone', icon: UploadSimple, label: 'Dropzone' },
  { id: 'compressor', icon: ArrowsDownUp, label: 'Compressor' },
  { id: 'base64', icon: Code, label: 'Base64' },
  { id: 'contrast', icon: Palette, label: 'Contrast' },
  { id: 'cssgen', icon: PaintBrush, label: 'CSS Gen' },
  { id: 'scratchpad', icon: Notepad, label: 'Scratchpad' },
  { id: 'dummy', icon: Database, label: 'Dummy Data' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
];

export default function SoundboardSidebar({ activeView, setActiveView }) {
  return (
    <div className="w-[320px] shrink-0 h-full flex flex-col p-8">
      {/* Brand */}
      <h1 className="font-mono text-2xl text-primary font-bold tracking-widest mb-12">
        Pipeline
      </h1>

      {/* 3x3 Soundboard Grid */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={item.label}
              className={\spect-square rounded-2xl flex items-center justify-center transition-all duration-300 \\}
            >
              <Icon size={28} weight={isActive ? "fill" : "duotone"} />
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-primary/20 w-full mb-10" />

      {/* Time Display */}
      <TimeDisplay />
    </div>
  );
}
;
fs.writeFileSync(path.join(targetDir, 'components', 'SoundboardSidebar.jsx'), sidebarContent);

// 3. App.jsx
const appContent = 
import "./index.css";
import React, { useState } from "react";
import SoundboardSidebar from "./components/SoundboardSidebar";
import PipelineHome from "./views/PipelineHome";
import DropzoneCard from "./components/cards/DropzoneCard";
import CompressorCard from "./components/cards/CompressorCard";
import Base64Card from "./components/cards/Base64Card";
import ContrastCheckerCard from "./components/cards/ContrastCheckerCard";
import CssGeneratorCard from "./components/cards/CssGeneratorCard";
import ScratchpadCard from "./components/cards/ScratchpadCard";
import DummyDataCard from "./components/cards/DummyDataCard";
import TerminalCard from "./components/cards/TerminalCard";

const views = {
  home: PipelineHome,
  dropzone: DropzoneCard,
  compressor: CompressorCard,
  base64: Base64Card,
  contrast: ContrastCheckerCard,
  cssgen: CssGeneratorCard,
  scratchpad: ScratchpadCard,
  dummy: DummyDataCard,
  terminal: TerminalCard,
};

export default function App() {
  const [activeView, setActiveView] = useState("home");
  
  const ActiveComponent = views[activeView] || PipelineHome;

  return (
    <div className="bg-[#111111] w-full h-screen overflow-hidden flex p-6 gap-6 font-sans">
      <SoundboardSidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-background rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative">
        <div className="w-full h-full overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-4xl mx-auto w-full">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
;
fs.writeFileSync(path.join(targetDir, 'App.jsx'), appContent);

console.log("Layout successfully rebuilt!");
