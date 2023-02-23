import React from 'react';
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
import App from './App.jsx';
import './.scss';

root.render(<App />);