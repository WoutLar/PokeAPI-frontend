import React, { useEffect, useState } from 'react';
import './App.scss';
import SearchBar from './SearchBar';

interface Pokemon {
    name: string;
    url: string;
}

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokemon list');
                }
                const data = await response.json();
                setPokemonList(data.results);
                setFilteredPokemonList(data.results);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };

        fetchPokemonList();
    }, []);

    // Function to handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredPokemonList(filtered);
    };

    return (
        <div className="pokemon-list">
            <h2>List of Pokémon:</h2>
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="pokemon-tiles">
                {filteredPokemonList.map((pokemon, index) => (
                    <div className="pokemon-tile" key={index}>
                        {pokemon.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
