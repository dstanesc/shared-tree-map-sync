import * as readline from "node:readline";

import { mapSync } from "./service.js";
import { FluidMode } from "@dstanesc/shared-tree-map";

function readMultipleInputs(): Promise<[FluidMode, FluidMode, string]> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<[FluidMode, FluidMode, string]>((resolve) => {
    rl.question("Provide source relay: [tiny, frs] ", (sourceRelay) => {
      if (sourceRelay !== "tiny" && sourceRelay !== "frs") {
        console.log("Invalid relay, must be either tiny or frs");
        process.exit(1);
      }
      rl.question("Provide target relay: [tiny, frs] ", (targetRelay) => {
        if (targetRelay !== "tiny" && targetRelay !== "frs") {
          console.log("Invalid relay, must be either tiny or frs");
          process.exit(1);
        }
        rl.question(
          "Provide source map identity [eg. 38c23a58-e558-4093-8c4f-852bc0cc03a5]: ",
          (mapIdentity) => {
            rl.close();
            resolve([
              sourceRelay as FluidMode,
              targetRelay as FluidMode,
              mapIdentity,
            ]);
          }
        );
      });
    });
  });
}

const [sourceRelay, targetRelay, sourceId] = await readMultipleInputs();

await mapSync(sourceId, undefined, sourceRelay, targetRelay).then(
  (sharedMaps) => {
    console.log(`Replicating ${sourceId} to: ${sharedMaps.targetMap.mapId()}`);
  }
);
