    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';

    interface PokemonDetails {
        name: string;
        height: number;
        weight: number;
        // Add more details as needed
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
                    const { name, height, weight } = data;
                    setDetails({ name, height, weight });
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
                <p><strong>Height:</strong> {details.height}</p>
                <p><strong>Weight:</strong> {details.weight}</p>
                <p><strong>Height:</strong> {details.height}</p>
                <p><strong>Weight:</strong> {details.weight}</p>
            </div>
        );
    };

    export default PokemonDetails;
