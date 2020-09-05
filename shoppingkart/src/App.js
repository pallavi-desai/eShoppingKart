import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/NavBar";
import Footer from "./Components/Footer";
import Routes from "./Components/Routes";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation/>
                <Routes/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
