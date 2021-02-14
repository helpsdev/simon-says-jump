import './App.css';
import { Stage, Sprite } from '@inlet/react-pixi'

function App() {
  return (
    <div className="App">
      <Stage>
        {getGroundSprites()}
      </Stage>
    </div>
  );
}

function getGroundSprites(){
  const canvasWidth = 800;
  const spriteWidth = 128;
  let placedSprite = 0;
  const groundSprites = [];

  while(placedSprite < canvasWidth){
    groundSprites.push(
      <Sprite image="./PlatformerTiles/PNG/upperGround.png" x={placedSprite} y={470} />
    );
    placedSprite+= spriteWidth;
  }

  return groundSprites;
}

export default App;
