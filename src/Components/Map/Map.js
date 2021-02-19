import "./Map.css";
import { Sprite, Container } from '@inlet/react-pixi';
import { useContext } from "react";
import { GameContext } from '../GameContext/GameContext';

function Map({width}){

    const getGroundSprites = function (){
        const canvasWidth = width;
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

    
    const {mapX} = useContext(GameContext);

    return <Container x={mapX}>{getGroundSprites()}</Container>
}



export default Map;