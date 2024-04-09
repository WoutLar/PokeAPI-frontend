import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import Header from "./Header.tsx"; // Assuming this component exists

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Header></Header>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
