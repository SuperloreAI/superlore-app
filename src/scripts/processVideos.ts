// npx ts-node --project tsconfig.scripts.json -r tsconfig-paths/register ./src/scripts/processVideos.ts
import axios from "axios";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const videos: string[] = [
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Clean%20Meat%20on%20a%20Plate.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Eating%20at%20the%20HIGHEST%20RATED%20KOREAN%20BBQ%20in%20Los%20Angeless.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Enoki%20Roll%20Prep%20(1).mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Fish%20Cake%20Recipe.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Food%20Table%20Side%20Dishes%20Meat.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Full%20Vlog%20Korean%20BBQ%201.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Gorjas%20Meat.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Kimbap%20Prep.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Full%20Vlog%20of%20Food%203.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Kimchi%20Side%20Dish.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Full%20Vlog%202.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Full%20Vlog%20with%20Friends%202.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Full%20Vlog%20with%20Friends.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Meat%20Cutting%20Date.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Rice.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20Sauce%20Tutorial.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20BBQ%20YT%20Vlog.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Korean%20Barbecue%20_%20Meat%20Grilling%20_%20Asian%20Dishes%20_%20Free%20Stock%20Videos%20_%20FoodArt%20TV.mp4",
  // "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Making%20Authentic%20Korean%20BBQ%20At%20Home.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Tempura%20Basket%20Recipe.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Nice%20Meat%20Korean%20BBQ.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Pork%20on%20Rotating%20grill%20_%20Korean%20Street%20Food.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Salmon%20Kuranchi%20Recipe.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Scallion%20Salad.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Shots%20of%20various%20side%20dishes%20(kimchi)%202.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Side%20Dish%20Preparation%20(Kimbap)%201.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/Spicy%20Cucumber%20Recipe.mp4",
  "https://storage.googleapis.com/superlore-video-sources-738437/ai-curation-test/TTTEAOBOKKI%20Recipe.mp4",
];

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const waitTime: number = 5 * 1000; // 3 minutes in milliseconds

  console.log("Processing videos...");
  for (let i = 0; i < videos.length; i++) {
    console.log(`Iteration ${i + 1}`);
    await axios({
      method: "post",
      url: "http://35.240.140.220:8000/clip-scenes",
      data: {
        videoUrl: videos[i],
        assetID: uuid(),
        title: "Test Video",
      },
    });
    console.log("Succesfully sent request to process video");
    await wait(waitTime);
  }
}

main();
