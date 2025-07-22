import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeaderBoard from "./pages/LeaderBoard";
import AddUser from "./pages/AddUser";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this!
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<LeaderBoard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/claim-history" element={<HistoryPage />} />
        </Routes>
    </>
  );
}

export default App;
