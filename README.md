# `shared-tree-map` sync agent

Test dynamic synchronization (eg. backup for transient collab. environments) across multiple `shared-tree-map` instances and relays.

See also [shared-tree-map library](https://github.com/dstanesc/shared-tree-map), [shared-tree-map hello world](https://github.com/dstanesc/shared-tree-map-hello)

## Demo

Demonstrates incremental synchronization between two `shared-tree-map` instances. First `shared-tree-map` instantiation is used for local, low latency collaboration between collocated apps. The local relay is Tinylicious. The collaboration session is continuously synchronized to a second `shared-tree-map` instance, stored in the cloud, ie. Azure Fluid Relay. The cloud instance could be used for instance as backup and recovery for the local collaboration session.

![demo](img/map-sync.gif)

````bash

## Build

```bash
npm run clean
npm run build
````

## Run

```bash
npm start
```

## Module usage

```ts
import { mapSync, mapSyncOnce } from "@dstanesc/shared-tree-map-sync";

const sourceId = "76ecf8d1-23cd-4cea-a9c9-7007cae65e02";
const targetId = undefined;

// Sync continuously
const { sourceMap, targetMap } = await mapSync(
  sourceId,
  targetId,
  sourceRelay,
  targetRelay
);

// Sync once
const { sourceMap, targetMap } = await mapSyncOnce(
  sourceId,
  targetId,
  sourceRelay,
  targetRelay
);
```

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.
