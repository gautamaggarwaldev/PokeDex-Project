import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {

    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    async function fetchPokemonDetails() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);

        setPokemon(
            {
                name: response.data.name,
                height: response.data.height,
                id: response.data.id,
                weight: response.data.weight,
                image: response.data.sprites.other.dream_world.front_default,
                species: response.data.species.name,
                types: response.data.types.map((t) => t.type.name)
            }
        )
    }

    useEffect(()=> {
        fetchPokemonDetails();
    }, []);

    return (
        <div className="pokemon-detail-wrapper">
            <img className="pokemon-detail-image" src={pokemon.image} />
            <div className="pokemon-detail-name">Name: {pokemon.name}</div>
            <div>Id: {pokemon.id}</div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
            <div>Species: {pokemon.species}</div>
            <div className="pokemon-detail-type">
                 {pokemon.types && pokemon.types.map((t) => (<div key={t}> Type: {t} </div>))}
            </div>
        </div>
    )
}

export default PokemonDetails;