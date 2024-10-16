import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'; // this link give the detail of 20 pokemons 

    async function downloadPokemons() {
        const response = await axios.get(POKEMON_URL);
        console.log(response.data); 

        const pokemonResult = response.data.results; //array of the pokemon
        console.log(pokemonResult); // it contain pokemon name and the url which contain it's props


        //iterate over the array of pokemon
        const pokemonResultPromise = pokemonResult.map((pokemon)=> axios.get(pokemon.url));
        console.log(pokemonResultPromise);

        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData); // it is the array which contain the props of each pokemon  (pokemon info array)


        //iterate over the pokemon info array and collect the suitable info
        const PokeListResult = pokemonData.map((pokeData)=> {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        console.log(PokeListResult);
        setPokemonList(PokeListResult);
        setIsLoading(false);
    }
    
    useEffect(()=> {
        downloadPokemons();
    }, [pokemonList])

    return (
        <div className="pokemonList-wrapper">
            {/* <div>Pokemon List</div> */}
            <div className="pokemon-wrapper">
            {
                (isLoading) ? 'Loading....' : 
                pokemonList.map((p)=> 
                    <Pokemon name={p.name} image={p.image} key={p.id} />
                )
            }
            </div>
        </div>
    )

}

export default PokemonList;