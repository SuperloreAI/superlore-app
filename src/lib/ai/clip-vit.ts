import axios from "axios";
import fetch from "node-fetch";
import { getHuggingFaceAPI } from "@/lib/secrets/secrets";
import { CLIPEmbeddingResponse } from "@/lib/types/base.types";

type Base64ImgStr = string;
interface CLIPInput {
  text_list: string[];
  image_list: Base64ImgStr[];
}

export const tokenizeWithCLIP = async (
  inputs: CLIPInput
): Promise<CLIPEmbeddingResponse> => {
  const hfToken = await getHuggingFaceAPI();
  const endpoint = `${process.env.CLIP_EMBEDDING_SERVER}`;
  try {
    const { data } = await axios({
      method: "post",
      url: endpoint,
      data: { inputs },
      headers: {
        Authorization: `Bearer ${hfToken}`,
        Accept: "application/json",
      },
    });
    return data;
  } catch (e) {
    console.log((e as any).message);
    throw e;
  }
};

export async function encodeImageToBase64(url: string) {
  // Fetch the image from the remote URL
  const response = await fetch(url);

  // Check if the response is successful (status 200)
  if (!response.ok) {
    throw new Error(`Error fetching image: ${response.statusText}`);
  }

  // Retrieve the image as a Buffer
  const imageBuffer = await response.buffer();

  // Convert the Buffer to a Base64 string
  const base64String = imageBuffer.toString("base64");

  return base64String;
}
