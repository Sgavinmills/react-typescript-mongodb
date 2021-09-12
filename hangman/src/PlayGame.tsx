import { useEffect, useState } from "react"
import HangedMan from "./HangedMan";
import './PlayGame.css';
import { InputEvent, SubmitEvent, ButtonEvent } from "./formEvents/formEvents.js"; 

interface Props {
    gameWord: string;
    setInGame: (val: boolean) => void;
    setGameWord: (val: string) => void;
}

export default function PlayGame(props: Props) {

    const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]); //type cannot be inferred from empty array so is explcitly stated as string[]
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [formInput, setFormInput] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if(incorrectLetters.length > 10) {
            setGameOver(true);
        } 

        if(props.gameWord.split('').every(letter => correctLetters.includes(letter))) {
            setGameOver(true);
        }
        
    }, [correctLetters, incorrectLetters, props.gameWord])

    const handleChange = (e: InputEvent) => {
        setFormInput(e.target.value);
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if(formInput.length === 1 && !gameOver) {
            if(incorrectLetters.includes(formInput) || correctLetters.includes(formInput)) {
                alert('Already chosen that letter');
                setFormInput('');
            } else {
                let regex = new RegExp(formInput);
                if(regex.test(props.gameWord)) {
                    setCorrectLetters(currLetters => {
                        const newLetters = [...currLetters];
                        newLetters.push(formInput);
                        return newLetters;
                    })
                    setFormInput('');
                } else {
                    setIncorrectLetters(currLetters => {
                        const newLetters = [...currLetters];
                        newLetters.push(formInput);
                        return newLetters;
                    })
                    setFormInput('');
                }
            }
        } else {
            console.log('enter 1 letter and only 1 letter - or perhaps game is over')
        }
    }
    const restartGame = (e: ButtonEvent)=> {
        props.setGameWord('');    
        props.setInGame(false);
    }
    return (
        <div className='container'>
            <h2>Wrong guesses: {incorrectLetters} </h2>
            <HangedMan incorrectLetters={incorrectLetters}/>
            {props.gameWord.split('').map((ele, index) => {
                return <div key={index} className="letter-display">{correctLetters.includes(ele) ? ele : '__'}</div>
            })}
            <form onSubmit={handleSubmit}>
                 <input value={gameOver ? 'GAME OVER' : formInput} type="textbox" placeholder="Enter a letter" onChange={handleChange} ></input>
                 <button>Submit letter</button>
            </form>
            
            {gameOver && <button onClick={restartGame}>Start Again</button>}
        </div>
    )
}
