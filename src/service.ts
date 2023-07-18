import { FluidMode, initMap } from "@dstanesc/shared-tree-map";

export async function mapSync(
  sourceId: string,
  source: FluidMode,
  target: FluidMode
) {
  const sourceMap = await initMap(sourceId, source);
  const targetMap = await initMap(undefined, target);
  console.log("replica id", targetMap.mapId());
  const initialState: Map<string, string> = sourceMap.asMap();
  console.log("Replicating initial state", initialState);
  targetMap.setMany(initialState);
  const eventStream = sourceMap.getBufferingBinder();
  eventStream.bindOnChange(
    (key, value) => {
      console.log(`Replicating incremental update key: ${key}, value: ${value}`);
      targetMap.set(key, value);
    },
    (key) => {
      console.log(`Replicating incremental delete key: ${key}`);
      targetMap.delete(key);
    }
  );
  return targetMap;
}
