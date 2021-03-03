import { Sprite, useApp } from "@inlet/react-pixi";
import { useState, useEffect } from "react";


function TestScene(){
    const app = useApp();
    const fumikoSpreadSheet = "./PlatformerTiles/fumiko_01/fumiko_01.json";
    const [textures, setTextures] = useState(null);
    
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
    
    
    
    return textures && <Sprite x={0} y={0} texture={textures["fumiko_010.png"]} scale={5}></Sprite>
    
}

export default TestScene;