import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    // const [isLoading, setIsLoading] = useState(true);
    // const [pokemonList, setPokemonList] = useState([]);
    // const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon'); // this link give the detail of 20 pokemons 
    // const [nextUrl, setNextUrl] = useState();
    // const [prevUrl, setPrevUrl] = useState();

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokemonUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons() {

        setPokemonListState({...pokemonListState, isLoading: true});
        
        const response = await axios.get(pokemonListState.pokemonUrl);
        console.log(response.data); 
        
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        setPokemonListState((state)=>({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));

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
        // setPokemonList(PokeListResult);
        // setIsLoading(false);
        setPokemonListState((state)=>({
            ...state,
            pokemonList: PokeListResult, 
            isLoading: false
        }));
    }
    
    useEffect(()=> {
        downloadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonListState.pokemonUrl])

    return (
        <div className="pokemonList-wrapper">
            <div className="pokemon-wrapper">
            {
                (pokemonListState.isLoading) ? 'Loading....' : 
                pokemonListState.pokemonList.map((p)=> 
                    <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                )
            }
            </div>
            <div className="controls">

                <button disabled={pokemonListState.prevUrl === null} onClick={()=> {
                    const urlToSet = pokemonListState.prevUrl;
                setPokemonListState({...pokemonListState, pokemonUrl: urlToSet})
                }}>Prev &#x2190;</button>

                <button disabled={pokemonListState.nextUrl === null} onClick={()=> {
                    const urlToSet = pokemonListState.nextUrl
                setPokemonListState({...pokemonListState, pokemonUrl: urlToSet})
                }}>Next &#x2192;</button>
                
            </div>
        </div>
    )
      //setPokemonListState({...pokemonListState, nextUrl: response.data.next, prevUrl: response.data.previous});
}

export default PokemonList;