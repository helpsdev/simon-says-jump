import './GameScene.css';
import Character from '../Character/Character';
import Map from "../Map/Map";
import { Container } from '@inlet/react-pixi';
import { MAP_WIDTH } from "../Defaults/Defaults";

function GameScene(){
    return(
        <Container>
            <Character />
            <Map width={MAP_WIDTH}/>
        </Container>
    );
}



export default GameScene;