import './Character.css';
import { Sprite, useTick, useApp } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import { useState, useContext, useReducer } from "react";
import { GameContext } from '../GameContext/GameContext';
import { MAP_WIDTH } from "../Defaults/Defaults";

const fumikoTexture = getFumikoFordwards();
const fumikoState = getFumikoInitialState();
const right = keyboard("ArrowRight");

const left = keyboard("ArrowLeft");

const space = keyboard(" ");
space.press = () => fumikoState.yVelocity = -5;
space.release = () => fumikoState.yVelocity = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case "fall":
      return {...state, yVelocity: state.yVelocity + (9.81 * action.secondsElapsed)};
    case "runFordwards":
      return {...state, xVelocity: action.xVelocity};
    case "updateX":
      return {...state, x: action.x};
    case "updateY":
      return {...state, y: action.y};
    default:
      break;
  }
};
const initalState = {
  x: 0,
  y: 0,
  xVelocity: 0,
  yVelocity: 0,
  secondsElapsed : 0
};
function Character () {
    const [fumiko, dispatch] = useReducer(reducer, initalState);
    const [frameCounter, setFrameCounter] = useState(0);
    // const [falling, setFalling] = useState(false);
    const {setCharacterHasReachedTheEnd, setMapX , mapX} = useContext(GameContext);
    const {renderer} = useApp();
    const gravity = 9.81;

    
    right.press = () => {dispatch({xVelocity: fumiko.xVelocity + 5, type: "runFordwards"}); console.log({fumiko,key:"pressed"});};
    right.release = () => {dispatch({xVelocity: 0, type: "runFordwards"}); console.log({fumiko, key:"released"}); };
    left.press = () => dispatch({xVelocity: fumiko.xVelocity - 5, type:"runFordwards"});
    left.release = () => dispatch({xVelocity: 0, type: "runFordwards"});

    useTick(delta => {
      
      const isXPositionGreaterThanMapWidth = fumiko.x + fumiko.xVelocity > MAP_WIDTH;
      if (isXPositionGreaterThanMapWidth) return setCharacterHasReachedTheEnd(isXPositionGreaterThanMapWidth);  

      const hasFumikoReachedTheMapsBeginning = fumiko.x + fumiko.xVelocity < 0;
      const isFumikoAtTheCenter = fumiko.x >= renderer.width / 2;
      

      if (isFumikoAtTheCenter && mapX <= 0) {
        setMapX(hasFumikoReachedTheMapsBeginning ? mapX : mapX - fumiko.xVelocity);  
      }else{
        dispatch({x: hasFumikoReachedTheMapsBeginning ? 0 : fumiko.x + fumiko.xVelocity, type: "updateX"})
        setMapX(0);
      }

      //Simulate jumping
      // if (falling) {
      //   setYPosition(yPosition + 5 <= 365 ? yPosition + 5 : 365);
      //   setFalling(yPosition === 365 ? false : true);
      // }else if(yPosition >= 270){
      //   setYPosition(yPosition + fumikoState.yVelocity);
      //   setFalling(yPosition === 270);
      // }
      
      if (frameCounter <=60) {
        setFrameCounter(frameCounter + 1);
      }else{
        dispatch({secondsElapsed: fumiko.secondsElapsed + 1, type:"fall"});
        setFrameCounter(0);
      }
      
      if (fumiko.y < 365) {  
        dispatch({y: fumiko.y + fumiko.yVelocity, type: "updateY"});
      }else{
        dispatch({y: 365, type: "updateY"});
      }
    });
    
    return <Sprite x={fumiko.x} y={fumiko.y} texture={fumikoTexture} scale={3.5}  />;
}


function getFumikoInitialState() {
    return{
        xVelocity: 0,
        yVelocity: 1,
        falling : false
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
    const fumikoFrame = new PIXI.Rectangle(0,32,24,32);
  
  
    return new PIXI.Texture(fumikoBaseTexture, fumikoFrame);
  }
export default Character;