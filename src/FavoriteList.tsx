import React from 'react';
import FavoritePokemonTile from './FavoritePokemonTile';

interface FavoriteListProps {
    favoritePokemon: string[];
    onUnfavorite: (pokemonName: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favoritePokemon, onUnfavorite }) => {
    return (
        <div>
            {favoritePokemon.map((name, index) => (
                <FavoritePokemonTile
                    key={index}
                    name={name}
                    onUnfavorite={() => onUnfavorite(name)}
                />
            ))}
        </div>
    );
};

export default FavoriteList;
