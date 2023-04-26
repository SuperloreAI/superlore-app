export type WebSocketsURI = string;

export type PineconeVectorObject = {
  id: string;
  values: number[];
  metadata: Record<string, string>;
};
export interface CLIPEmbeddingResponse {
  image_features: number[][];
  text_features: number[][];
  similarity_scores: number[];
}
