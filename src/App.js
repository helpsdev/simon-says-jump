import './App.css';
import GameScene from "./Components/GameScene/GameScene";
import GameOverScene from "./Components/GameOverScene/GameOverScene";
import { Stage } from '@inlet/react-pixi';
import { GameContext } from './Components/GameContext/GameContext';
import { useState } from 'react';


function App() {
  const [characterHasReachedTheEnd, setCharacterHasReachedTheEnd] = useState(false);
  const [mapX, setMapX] = useState(0);

  return (
    <div className="App">
      <Stage>
        <GameContext.Provider value={{setCharacterHasReachedTheEnd, mapX,setMapX}}>
          {characterHasReachedTheEnd ? <GameOverScene /> : <GameScene />}
        </GameContext.Provider>
      </Stage>
    </div>
  );
}



export default App;
