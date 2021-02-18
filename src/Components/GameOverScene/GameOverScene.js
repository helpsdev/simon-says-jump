import './GameOverScene.css';
import * as PIXI from "pixi.js";
import { Container, Text } from "@inlet/react-pixi";

function GameOverScene(){
    const canvasHeight = 600;
    const canvasWidth = 800;
    return (
        <Container>
            <Text style={new PIXI.TextStyle({
                            fontFamily: "Futura",
                            fontSize: 64,
                            fill: "white"
                        })} text={"You won!"} x={(canvasWidth / 2) - 100} y={(canvasHeight / 2) - 32 } > 
            </Text>
        </Container>
    );
}

export default GameOverScene;