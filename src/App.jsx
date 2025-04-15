import React from "react";
import Convertcase from "./Component/Convertcase";

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      {/* Background Glow Effects */}
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-0"></div>
      {/* Conversion Section on Top */}
      <div className="relative z-10 pt-10 px-4">
        <Convertcase />
      </div>
    </div>
  );
};

export default App;
