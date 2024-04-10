import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Ability {
    name: string;
}

interface Move {
    name: string;
}

interface Type {
    name: string;
}

interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    abilities: Ability[];
    moves: Move[];
    types: Type[];
    sprites: {
        front_default: string | null;
        back_default: string | null;
        front_shiny: string | null;
        back_shiny: string | null;
    };
}

const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the "id" parameter from the URL
    const [details, setDetails] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokemon details');
                }
                const data = await response.json();

                const abilities = data.abilities.map((ability: any) => ({ name: ability.ability.name }));
                const moves = data.moves.map((move: any) => ({ name: move.move.name }));
                const types = data.types.map((type: any) => ({ name: type.type.name }));

                const { name, height, weight, sprites } = data; // Destructure sprites
                setDetails({ name, height, weight, abilities, moves, types, sprites });
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-details">
            <h2>{details.name} Details</h2>
            <p><strong>Types:</strong> {details.types.map(type => type.name).join(', ')}</p>
            <div className="sprites">
                {details.sprites.front_default &&
                    <img src={details.sprites.front_default} alt={`${details.name} front`}/>}
                {details.sprites.back_default && <img src={details.sprites.back_default} alt={`${details.name} back`}/>}
                {details.sprites.front_shiny &&
                    <img src={details.sprites.front_shiny} alt={`${details.name} shiny front`}/>}
                {details.sprites.back_shiny &&
                    <img src={details.sprites.back_shiny} alt={`${details.name} shiny back`}/>}
            </div>
            <p><strong>Height:</strong> {details.height}</p>
            <p><strong>Weight:</strong> {details.weight}</p>
            <p><strong>Abilities:</strong> {details.abilities.map(ability => ability.name).join(', ')}</p>
            <p><strong>Moves:</strong> {details.moves.map(move => move.name).join(', ')}</p>
            <Link to="/">Close</Link>
        </div>
    );
};

export default PokemonDetails;
