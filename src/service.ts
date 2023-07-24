import { FluidMode, SharedTreeMap, initMap } from "@dstanesc/shared-tree-map";

export async function mapSync(
  sourceId: string | undefined,
  targetId: string | undefined,
  source: FluidMode,
  target: FluidMode
): Promise<{ sourceMap: SharedTreeMap; targetMap: SharedTreeMap }> {
  const { sourceMap, targetMap } = await mapSyncOnce(
    sourceId,
    targetId,
    source,
    target
  );
  const eventStream = sourceMap.getBufferingBinder();
  eventStream.bindOnChange(
    (key, value) => {
      console.log(
        `Replicating incremental update key: ${key}, value: ${value}`
      );
      targetMap.set(key, value);
    },
    (key) => {
      console.log(`Replicating incremental delete key: ${key}`);
      targetMap.delete(key);
    }
  );
  return { sourceMap, targetMap };
}

export async function mapSyncOnce(
  sourceId: string | undefined,
  targetId: string | undefined,
  source: FluidMode,
  target: FluidMode
): Promise<{ sourceMap: SharedTreeMap; targetMap: SharedTreeMap }> {
  const sourceMap = await initMap(sourceId, source);
  const targetMap = await initMap(targetId, target);
  console.log("replica id", targetMap.mapId());
  const initialState: Map<string, string> = sourceMap.asMap();
  console.log("Replicating initial state", initialState);
  targetMap.setMany(initialState);
  return { sourceMap, targetMap };
}
