import { getPineconeAPI } from "@/lib/secrets/secrets";
import { PineconeClient } from "@pinecone-database/pinecone";
import {
  pineconeGenericKBBQClipsNamespace,
  pineconeIndex,
} from "@/lib/constants";
import { PineconeVectorObject } from "@/lib/types/base.types";
import { QueryResponse } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export const saveToPinecone = async (vectors: PineconeVectorObject[]) => {
  const api_key = await getPineconeAPI();
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "us-west4-gcp",
    apiKey: api_key,
  });
  const index = pinecone.Index(pineconeIndex);
  const upsertRequest = {
    vectors,
    namespace: pineconeGenericKBBQClipsNamespace,
  };
  const upsertResponse = await index.upsert({ upsertRequest });
  console.log(upsertResponse);
  return upsertResponse;
};

export const queryPinecone = async (
  queryVector: number[]
): Promise<QueryResponse> => {
  const api_key = await getPineconeAPI();
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "us-west4-gcp",
    apiKey: api_key,
  });
  const index = pinecone.Index(pineconeIndex);
  const queryRequest = {
    vector: queryVector,
    topK: 10,
    includeValues: true,
    includeMetadata: true,
    namespace: pineconeGenericKBBQClipsNamespace,
  };
  const queryResponse = await index.query({ queryRequest });
  return queryResponse;
};
