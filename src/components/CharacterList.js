import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import {Link} from 'react-router-dom';

export default function CharacterList(props) {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState();
  const [searchArg, setSearchArg] = useState();

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  setCharacters(characters);
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then(res => {
        console.log(res.data.results);
        if (!props.searchArg.values || props.searchArg.values.search === "") {
          setCharacters(res.data.results);
          console.log("No search");
        } else {
          setCharacters(res.data.results.filter((item) => {
            console.log("filtering", item.name + " === " + props.searchArg.values.search);
            return item.name.includes(props.searchArg.values.search);
          }))
        }
      })
      .catch(err => {
        console.log(err);
      });
  

  if (!characters) return (<p>Loading...</p>)
}, []);
  return (
    <section className="character-list">
      <h2>TODO: `array.map()` over your state here!</h2>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/Search">
        <button>Search</button>
      </Link>
  
{characters.map(char => {
  return (
    <CharacterCard
      key={char.id}
      name={char.name}
      species={char.species}
      status={char.status}
    />
  );
})}
</section>
  )}
