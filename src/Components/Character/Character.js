import './Character.css';
import { Sprite, useTick, useApp } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import { useState, useContext, useReducer } from "react";
import { GameContext } from '../GameContext/GameContext';
import { MAP_WIDTH } from "../Defaults/Defaults";

const fumikoTexture = getFumikoFordwards();
const right = keyboard("ArrowRight");

const left = keyboard("ArrowLeft");

const space = keyboard(" ");


const reducer = (state, action) => {
  switch (action.type) {
    case "fall":                                                                      
      return {...state, airTime: action.airTime, yVelocity: state.yVelocity + (.81 * action.airTime) / 60};
    case "runFordwards":
      return {...state, xVelocity: action.xVelocity};
    case "updateX":
      return {...state, x: action.x};
    case "updateY":
      return {...state, y: action.y};
    case "jump":
      return {...state, jumpTime: action.jumpTime, y: state.y - (.81 * action.jumpTime)}
    default:
      break;
  }
};
const initalState = {
  x: 0,
  y: 0,
  xVelocity: 0,
  yVelocity: 0,
  secondsElapsed : 0,
  airTime:0
};
function Character () {
  const [fumiko, dispatch] = useReducer(reducer, initalState);
  const [frameCounter, setFrameCounter] = useState(0);
  const {setCharacterHasReachedTheEnd, setMapX , mapX} = useContext(GameContext);
  const {renderer} = useApp();
  const isFumikoOnTheGround = () => fumiko.y >= 365;
  
  right.press = () => {dispatch({xVelocity: fumiko.xVelocity + 5, type: "runFordwards"}); console.log({fumiko,key:"pressed"});};
  right.release = () => {dispatch({xVelocity: 0, type: "runFordwards"}); console.log({fumiko, key:"released"}); };
  left.press = () => dispatch({xVelocity: fumiko.xVelocity - 5, type:"runFordwards"});
  left.release = () => dispatch({xVelocity: 0, type: "runFordwards"});
  space.press = () => dispatch({jumpTime: 5, type:"jump", yVelocity: 0});
  space.release = () => dispatch({airTime: isFumikoOnTheGround() ? 0 : fumiko.airTime + 1, type: "fall"});

  useTick(delta => { 
    setFrameCounter(frameCounter + 1);
    
    dispatch({airTime: isFumikoOnTheGround() ? 0 : fumiko.airTime + 1, type: "fall"});
    dispatch({y: isFumikoOnTheGround() ? 365 : fumiko.yVelocity * fumiko.airTime, type: "updateY"});
    
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

    console.log(fumiko.yVelocity);
  });
  
  

  return <Sprite x={fumiko.x} y={fumiko.y} texture={fumikoTexture} scale={3.5}  />;
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