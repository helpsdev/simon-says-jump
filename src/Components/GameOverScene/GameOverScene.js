import './GameOverScene.css';
import * as PIXI from "pixi.js";
import { Container, Text, Sprite } from "@inlet/react-pixi";
import { GameContext } from '../GameContext/GameContext';
import { useContext } from "react";

function GameOverScene(){
    const canvasHeight = 600;
    const canvasWidth = 800;
    const { unpressedButton, pressedButton } = getPressButton();

    const onButtonDown = function (){
        this.texture = pressedButton;
    }
    const onButtonUp = function(){
        this.texture = unpressedButton;
    }

    const gameContext = useContext(GameContext);

    const onButtonClick = function(){
        gameContext.setCharacterHasReachedTheEnd(false);
    }

    return (
        <Container>
            <Text style={new PIXI.TextStyle({
                            fontFamily: "Futura",
                            fontSize: 64,
                            fill: "white"
                        })} text={"You won!"} x={(canvasWidth / 2) - 100} y={(canvasHeight / 2) - 100 } > 
            </Text>
            <Text style={new PIXI.TextStyle({
                            fontFamily: "Futura",
                            fontSize: 64,
                            fill: "white"
                        })} text={"Push the button to start"} x={120} y={(canvasHeight / 2) - 32 } > 
            </Text>
            <Sprite x={340} y={360} texture={unpressedButton} scale={0.5} 
                pointerdown={onButtonDown} pointerup={onButtonUp}
                interactive={true} buttonMode={true} click={onButtonClick}>
            </Sprite>
        </Container>
    );
}

function getPressButton(){
    const pressButtonBaseTexture = new PIXI.BaseTexture("./PlatformerTiles/press-button.png");
    const unpressedButtonRectangle = new PIXI.Rectangle(0,0,320,320);
    const pressedButtonRectangle = new PIXI.Rectangle(320,0,320,320);
    return {
        unpressedButton: new PIXI.Texture(pressButtonBaseTexture, unpressedButtonRectangle),
        pressedButton: new PIXI.Texture(pressButtonBaseTexture, pressedButtonRectangle)
    }
}



export default GameOverScene;