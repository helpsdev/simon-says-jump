import './App.css';
import GameScene from "./Components/GameScene/GameScene";
import GameOverScene from "./Components/GameOverScene/GameOverScene";
import { Stage } from '@inlet/react-pixi';


function App() {
  return (
    <div className="App">
      <Stage>
        <GameScene />
        <GameOverScene />
      </Stage>
    </div>
  );
}



export default App;
