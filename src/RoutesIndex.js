import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home";
import Header from './layout/Header'

function RoutesIndex() {
    return(
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/spotify" element={<App />} />
            </Routes>
        </Router>
    )
}
 
export default RoutesIndex;