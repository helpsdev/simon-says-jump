import './GameScene.css';
import Character from '../Character/Character';
import Map from "../Map/Map";
import { Stage } from '@inlet/react-pixi';

function GameScene(){
    return(
        <Stage>
            <Character />
            <Map />
        </Stage>
    );
}



export default GameScene;