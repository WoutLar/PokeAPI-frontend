import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import Header from './Header';
import FavoriteList from './FavoriteList';

const App: React.FC = () => {
    const [favoritePokemon, setFavoritePokemon] = useState<string[]>([]);

    const handleFavoriteClick = (pokemonName: string) => {
        if (!favoritePokemon.includes(pokemonName)) {
            setFavoritePokemon([...favoritePokemon, pokemonName]);
        }
    };

    const handleUnfavorite = (pokemonName: string) => {
        setFavoritePokemon(favoritePokemon.filter(name => name !== pokemonName));
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <FavoriteList favoritePokemon={favoritePokemon} onUnfavorite={handleUnfavorite} />
                <Routes>
                    <Route path="/" element={<PokemonList onFavoriteClick={handleFavoriteClick} />} />
                    <Route path="/pokemon/:id" element={<PokemonDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
