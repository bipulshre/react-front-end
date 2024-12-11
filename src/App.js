import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from "./pages/Team";
import Player from "./pages/Player";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/player" element={<Player />} />
            <Route path="/team" element={<Team />} />

        </Routes>
    </Router>
);

export default App;
