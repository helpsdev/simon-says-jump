import { Sprite, useApp } from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';
import { useState, useEffect } from "react";


function TestScene(){
    const app = useApp();
    const fumikoSpreadSheet = "./PlatformerTiles/fumiko_01/fumiko_01.json";
    const [textures, setTextures] = useState(null);
    
    // if (app.loader.resources[fumikoSpreadSheet]) {
    //     setTest("cache");
    // }else{
    //     app.loader.add(fumikoSpreadSheet).load((l, resources) => {
    //         // setTextures(resources[fumikoSpreadSheet].textures);
    //         setTest("init");
    //     });
    // }

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
    
    // return <Sprite x={0} y={0} texture={app.loader.resources[fumikoSpreadSheet].textures["fumiko_010.png"]}></Sprite>
    return textures && <Sprite x={0} y={0} texture={textures["fumiko_010.png"]}></Sprite>
    
}

export default TestScene;