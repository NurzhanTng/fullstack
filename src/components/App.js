import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import Contacts from "../pages/Contacts"
import Test from "../pages/Test"

import '../assets/App.css';

function App() {
    return (
        <div className="app">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </div>
    );
}

export default App;