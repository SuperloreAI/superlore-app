import { addMediaAsset } from "@/lib/db/operations";
import { initializePool } from "@/lib/db/postgres";
import { MediaAssetType } from "@/lib/db/types";
import { v4 as uuid } from "uuid";

// npx ts-node --project tsconfig.scripts.json -r tsconfig-paths/register ./src/scripts/testEndpoint.ts
const run = async () => {
  await initializePool();
  const id = uuid();
  const data = {
    id: id,
    title: "Test Title",
    assetType: MediaAssetType.video,
    url: "https://www.youtube.com/watch?v=QH2-generated",
    prompt: "",
    thumbnail: "",
    metadata: {
      duration: 10,
      width: 1920,
      height: 1080,
    },
  };
  await addMediaAsset(data);
};

run();
