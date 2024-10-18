import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

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
            <img draggable="false" className="pokemon-detail-image" src={pokemon.image} />
            <div className="pokemon-detail-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-detail">Id: <span>{pokemon.id}</span></div>
            <div className="pokemon-detail">Height: <span>{pokemon.height}</span> inch</div>
            <div className="pokemon-detail">Weight: <span>{pokemon.weight}</span> gm</div>
            <div className="pokemon-detail">Species: <span>{pokemon.species}</span></div>
            <div className="pokemon-detail-type">
                Type: {pokemon.types && pokemon.types.map((t) => (<span key={t}> {t} </span>))}
            </div>
        </div>
    )
}

export default PokemonDetails;