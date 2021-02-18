import "./Map.css";
import { Sprite } from '@inlet/react-pixi';

function Map(){
    return getGroundSprites();
}

function getGroundSprites(){
    const canvasWidth = 800;
    const spriteWidth = 128;
    let placedSprite = 0;
    const groundSprites = [];
    let counter = 0;

    while(placedSprite < canvasWidth){
        groundSprites.push(
            <Sprite key={counter.toString()} image="./PlatformerTiles/PNG/upperGround.png" x={placedSprite} y={470}  />
        );
        placedSprite+= spriteWidth;
        counter++;
    }

    return groundSprites;
}

export default Map;