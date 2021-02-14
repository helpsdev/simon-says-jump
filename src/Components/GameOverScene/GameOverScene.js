import './GameOverScene.css';
import * as PIXI from "pixi.js";
import { useApp, Container, Text } from "@inlet/react-pixi";

function GameOverScene(){
    const stageHeight = useApp().stage.height;

    return (
        <Container visible={false}>
            <Text style={new PIXI.TextStyle({
                            fontFamily: "Futura",
                            fontSize: 64,
                            fill: "white"
                        })} text={"You won!"} x={120} y={stageHeight / 2 - 32} > 
            </Text>
        </Container>
    );
}

export default GameOverScene;