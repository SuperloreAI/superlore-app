interface VideoInfo {
  title: string;
  previewImage: string;
}

export async function fetchVideoInfo(url: string): Promise<VideoInfo | null> {
  try {
    const response = await fetch(url);
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogImage = doc.querySelector('meta[property="og:image"]');

    if (ogTitle && ogImage) {
      return {
        title: ogTitle.getAttribute("content")!,
        previewImage: ogImage.getAttribute("content")!,
      };
    }
  } catch (error) {
    console.error("Error fetching video info:", error);
  }

  return null;
}

export function trimStringWithEllipsis(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - 3) + "...";
}
