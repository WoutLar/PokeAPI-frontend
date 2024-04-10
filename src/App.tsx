import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import Header from './Header';
import FavoriteList from './FavoriteList';

const App: React.FC = () => {
    const [favoritePokemon, setFavoritePokemon] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Attempting to load favoritePokemon from local storage...");
        const storedFavorites = localStorage.getItem('favoritePokemon');
        if (storedFavorites) {
            console.log("Loaded favoritePokemon from local storage:", storedFavorites);
            setFavoritePokemon(JSON.parse(storedFavorites));
        } else {
            console.log("No favoritePokemon found in local storage.");
        }
        setLoading(false); // Set loading to false after loading from local storage
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("Saving favoritePokemon to local storage:", favoritePokemon);
            localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));
        }
    }, [favoritePokemon, loading]);

    const handleFavoriteClick = (pokemonName: string) => {
        if (!favoritePokemon.includes(pokemonName)) {
            const updatedFavorites = [...favoritePokemon, pokemonName];
            setFavoritePokemon(updatedFavorites);
        }
    };

    const handleUnfavorite = (pokemonName: string) => {
        const updatedFavorites = favoritePokemon.filter(name => name !== pokemonName);
        setFavoritePokemon(updatedFavorites);
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being loaded
    }

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
