import './GameScene.css';
import Character from '../Character/Character';
import Map from "../Map/Map";
import { Container } from '@inlet/react-pixi';

function GameScene(){
    return(
        <Container>
            <Character />
            <Map />
        </Container>
    );
}



export default GameScene;