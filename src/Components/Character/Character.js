import './Character.css';
import { Sprite, useTick, useApp } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import { useState } from "react";

const fumikoTexture = getFumikoFordwards();
const fumikoState = getFumikoInitialState();
const right = keyboard("ArrowRight");
right.press = () => fumikoState.xVelocity = 5;
right.release = () => fumikoState.xVelocity = 0;
const left = keyboard("ArrowLeft");
left.press = () => fumikoState.xVelocity = -5;
left.release = () => fumikoState.xVelocity = 0;

function Character () {
    const [xPosition, setXPosition] = useState(0);
    useTick(() => setXPosition(xPosition + fumikoState.xVelocity));

    return <Sprite x={xPosition} y={365} texture={fumikoTexture} scale={3.5}  />;
}


function getFumikoInitialState() {
    return{
        xVelocity: 0
    };
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }


function getFumikoFordwards(){
    const fumikoBaseTexture = new PIXI.BaseTexture("./PlatformerTiles/Fumiko.png");
    const fumikoFrame = new PIXI.Rectangle(0,34,25,34);
  
  
    return new PIXI.Texture(fumikoBaseTexture, fumikoFrame);
  }
export default Character;