import { useState } from 'react';
import './App.css';
import GameSetup from './GameSetup';
import PlayGame from './PlayGame';

function App() {

  //types automatically inferred by typescript
  const [gameWord, setGameWord] = useState('');
  const [inGame, setInGame] = useState(false);

  return (
    !inGame ? <GameSetup gameWord={gameWord} setGameWord={setGameWord} setInGame={setInGame} />
    : <PlayGame gameWord={gameWord} setInGame={setInGame} setGameWord={setGameWord}/>
  );
}

export default App;
