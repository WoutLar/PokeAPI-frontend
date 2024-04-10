import React from 'react';
import { Link } from 'react-router-dom';

interface FavoritePokemonTileProps {
    name: string;
    onUnfavorite: () => void;
}

const FavoritePokemonTile: React.FC<FavoritePokemonTileProps> = ({ name, onUnfavorite }) => {
    return (
        <div className="favorite-pokemon-tile">
            <Link to={`/pokemon/${name}`}>
                {name}
            </Link>
            <button onClick={onUnfavorite}>Unfavorite</button>
        </div>
    );
};

export default FavoritePokemonTile;
