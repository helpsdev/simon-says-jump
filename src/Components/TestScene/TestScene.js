import { Sprite, useApp } from "@inlet/react-pixi";
import { useState, useEffect } from "react";

function TestScene(){
    const app = useApp();
    const fumikoSpreadSheet = "./PlatformerTiles/fumiko_01/fumiko_01.json";
    const [textures, setTextures] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [fumikoTexture, setFumikoTexture] = useState(null);
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        // get from cache
        if (app.loader.resources[fumikoSpreadSheet]) {
          setTextures(app.loader.resources[fumikoSpreadSheet]);
          return;
        }
    
        // else load
        app.loader.add(fumikoSpreadSheet).load((_, resource) => {
          setTextures(resource[fumikoSpreadSheet].textures);
        });
      }, [app.loader, fumikoSpreadSheet]);
    
    useEffect(() => {
      
      const intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 100);

      return () => clearInterval(intervalId);
    }, []);

    const fumikos = [
      "fumiko_010.png",
      "fumiko_011.png",
      "fumiko_012.png",
      "fumiko_013.png",
      "fumiko_014.png",
      "fumiko_015.png"
    ]
    useEffect(() => {
      if (textures) {
        setIndex(index => index + 1 < fumikos.length ? index + 1 : 0);
        setFumikoTexture(textures[fumikos[index]]);  
      }  
    }, [seconds]);
    
    return fumikoTexture && <Sprite x={0} y={0} texture={fumikoTexture} scale={5}></Sprite>
    
}

export default TestScene;