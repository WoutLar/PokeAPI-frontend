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

interface Stat {
    name: string;
    value: number;
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
    stats: Stat[];
}

const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<PokemonDetails | null>(null);
    const [searchMove, setSearchMove] = useState<string>('');

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
                const stats = data.stats.map((stat: any) => ({ name: stat.stat.name, value: stat.base_stat }));

                const { name, height, weight, sprites } = data;
                setDetails({ name, height, weight, abilities, moves, types, sprites, stats });
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    const filteredMoves = details.moves.filter(move => move.name.toLowerCase().includes(searchMove.toLowerCase()));

    return (
        <div className="pokemon-details">
            <h2>{details.name}:</h2>
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
            <p><strong>Stats:</strong></p>
            <table>
                <tbody>
                {details.stats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.name}</td>
                        <td>{stat.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><strong>Moves:</strong></p>
            <input
                type="text"
                placeholder="Search moves..."
                value={searchMove}
                onChange={e => setSearchMove(e.target.value)}
            />
            <div>
                {filteredMoves.map((move, index) => (
                    <span key={index}>{move.name}, </span>
                ))}
            </div>
            <Link to="/" className="close-button">Close</Link>
        </div>
    );
};

export default PokemonDetails;
