import { Sprite } from "@inlet/react-pixi";
import { useState, useEffect } from "react";
import { useTextures } from "./useTextures";

function TestScene(){
    const [textures, setTextures] = useState(null);
    const [fumikoPos, setFumikoPos] = useState(null);
    const fumikos = [
      "fumiko_010.png",
      "fumiko_011.png",
      "fumiko_012.png",
      "fumiko_013.png",
      "fumiko_014.png",
      "fumiko_015.png"
    ];

    useTextures(txt => {
      setTextures(txt);
      setFumikoPos({
        x: 0,
        y: 0,
        xVel: 0,
        yVel: 0,
        current: txt[fumikos[0]]
      });
    });
  
    const handleKeyDown = e => {
      switch (e.key) {
        case "ArrowRight":
          setFumikoPos({...fumikoPos, x: fumikoPos.x + 1});  
          break;
        case "ArrowLeft":
          setFumikoPos({...fumikoPos, x: fumikoPos.x - 1});  
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [fumikoPos]);

    const handleKeyUp = e => console.log(`${e.key} released`);

    useEffect(() => {
      document.addEventListener("keyup", handleKeyUp);
      return () => document.removeEventListener("keyup", handleKeyDown);
    }, [fumikoPos]);

    return fumikoPos && <Sprite x={fumikoPos.x} y={0} texture={fumikoPos.current} scale={5}></Sprite>
    
}

export default TestScene;