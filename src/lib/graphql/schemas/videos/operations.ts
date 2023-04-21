import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listVideos(
  searchString: string,
  limit: number,
  cursorStart: string
) {
  const whereClause = searchString
    ? {
        title: {
          contains: searchString,
          mode: "insensitive" as const,
        },
      }
    : {};
  const searchConfig = {
    where: whereClause,
    skip: cursorStart ? 1 : 0,
    cursor: cursorStart ? { id: cursorStart } : undefined,
    take: limit || 10,
  };
  if (cursorStart) {
    // @ts-ignore
    searchConfig.skip = { id: { gt: cursorStart } };
  }
  try {
    const videos = await prisma.videos.findMany();

    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      prompt: video.prompt,
      thumbnail: video.thumbnail,
      status: video.status,
      url: video.url,
      notes: video.notes,
      archived: video.archived,
      createdAt: video.created_at,
      updatedAt: video.updated_at,
    }));
  } catch (err) {
    console.error("Error fetching videos:", err);
    throw err;
  }
}
