import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Structure_Master from './Page/Sheet Structure Master/StructureMaster'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Structure_Master />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

root.render(<App />);

export default App
