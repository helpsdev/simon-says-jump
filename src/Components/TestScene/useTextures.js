import { useApp } from "@inlet/react-pixi";
import { useEffect } from "react";

export function useTextures(callback) {
  const fumikoSpreadSheet = "./PlatformerTiles/fumiko_01/fumiko_01.json";
  const app = useApp();

  useEffect(() => {

    // get from cache
    if (app.loader.resources[fumikoSpreadSheet]) {
      callback(app.loader.resources[fumikoSpreadSheet]);
      return;
    }

    // else load
    app.loader.add(fumikoSpreadSheet).load((_, resource) => {
      callback(resource[fumikoSpreadSheet].textures);
    });
  }, [app.loader, fumikoSpreadSheet]);
}
