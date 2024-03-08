import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sheet_Master from './Page/Sheet Structure Master/SheetMaster';
import Serial_Master from './Page/Serial Structure Master/SerialMaster';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Sheet_Master />} />
        <Route path="/SerialMaster" element={<Serial_Master />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

root.render(<App />);

export default App
