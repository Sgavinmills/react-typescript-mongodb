import React, { useEffect, useState } from 'react';
import './GameSetup.css';
import { InputEvent, SubmitEvent, ButtonEvent } from "./formEvents/formEvents.js"; 

//need to state the type of each prop
interface Props {
    gameWord: string;
    setGameWord: (val: string) => void;
    setInGame: (val: boolean) => void;
}

//the below are all extracted and imported from formEvents.js now since they are used in multiple files, but left here so can be seen easily
//they create the correct type for a function call based on a html element event
// type InputEvent = React.ChangeEvent<HTMLInputElement>; 
// type SubmitEvent = React.FormEvent<HTMLFormElement>;
// type ButtonEvent = React.FormEvent<HTMLButtonElement>; 

export default function GameSetup(props: Props) {
    const [formInput, setFormInput] = useState('');
    const [definition, setDefinition] = useState('');
    const [validWord, setValidWord] = useState(false);

    const handleChange= (e: InputEvent) => { //the type of 'e' is an inputevent which is defined above as a special html changeevent type (excuse poor terminology)
        setFormInput(e.target.value);
    }
    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        props.setGameWord(formInput);
    }
    const startGame = (e: ButtonEvent)=> {
        if(validWord)
          props.setInGame(true);
    }

    useEffect(() => {
      if(props.gameWord.length > 0) {
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.gameWord}`)
          .then(response => response.json())
          .then(data => {
              if (data.title === 'No Definitions Found') {
                 setValidWord(false);
              } else {
                  setDefinition(data[0].meanings[0].definitions[0].definition);
                  setValidWord(true);
              }
          }).catch(e => {
              console.log(e);
          })
      }

    }, [props.gameWord, props.setGameWord])
    return (
        <div className="container">
            <h1>Welcome to Hangman</h1>
            <form onSubmit={handleSubmit}>
                 <input value={formInput} type="textbox" placeholder="Choose a word to challenge somebody..." onChange={handleChange} ></input>
                 <button>Check word</button>
            </form>

            <h2>{props.gameWord}</h2>
            <h3>{validWord ? definition : props.gameWord.length > 0 ? "Not a valid word" : ''}</h3>
            <button onClick={startGame}>Start game</button>
        </div>
    )
}
