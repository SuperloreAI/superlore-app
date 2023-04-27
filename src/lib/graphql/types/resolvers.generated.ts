/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { AudioMetadata } from './assets/resolvers/AudioMetadata';
import    { ClipResult } from './assets/resolvers/ClipResult';
import    { DemoItem } from './demo/resolvers/DemoItem';
import    { Mascot } from './demo/resolvers/Mascot';
import    { Media } from './assets/resolvers/Media';
import    { MediaMetadata } from './assets/resolvers/MediaMetadata';
import    { clipVideo as Mutation_clipVideo } from './assets/resolvers/Mutation/clipVideo';
import    { compileVideoFromRaws as Mutation_compileVideoFromRaws } from './videos/resolvers/Mutation/compileVideoFromRaws';
import    { createMascot as Mutation_createMascot } from './demo/resolvers/Mutation/createMascot';
import    { deleteMedia as Mutation_deleteMedia } from './assets/resolvers/Mutation/deleteMedia';
import    { extractVideo as Mutation_extractVideo } from './assets/resolvers/Mutation/extractVideo';
import    { generateScreenplay as Mutation_generateScreenplay } from './videos/resolvers/Mutation/generateScreenplay';
import    { updateMedia as Mutation_updateMedia } from './assets/resolvers/Mutation/updateMedia';
import    { uploadMedia as Mutation_uploadMedia } from './assets/resolvers/Mutation/uploadMedia';
import    { getMedia as Query_getMedia } from './assets/resolvers/Query/getMedia';
import    { greetings as Query_greetings } from './demo/resolvers/Query/greetings';
import    { listMedia as Query_listMedia } from './assets/resolvers/Query/listMedia';
import    { listVideos as Query_listVideos } from './videos/resolvers/Query/listVideos';
import    { ScreenPlay } from './videos/resolvers/ScreenPlay';
import    { ScreenPlayScene } from './videos/resolvers/ScreenPlayScene';
import    { SuggestedRaw } from './videos/resolvers/SuggestedRaw';
import    { Video } from './videos/resolvers/Video';
import    { VideoMetadata } from './assets/resolvers/VideoMetadata';
    export const resolvers: Resolvers = {
      Query: { getMedia: Query_getMedia,greetings: Query_greetings,listMedia: Query_listMedia,listVideos: Query_listVideos },
      Mutation: { clipVideo: Mutation_clipVideo,compileVideoFromRaws: Mutation_compileVideoFromRaws,createMascot: Mutation_createMascot,deleteMedia: Mutation_deleteMedia,extractVideo: Mutation_extractVideo,generateScreenplay: Mutation_generateScreenplay,updateMedia: Mutation_updateMedia,uploadMedia: Mutation_uploadMedia },
      
      AudioMetadata: AudioMetadata,
ClipResult: ClipResult,
DemoItem: DemoItem,
Mascot: Mascot,
Media: Media,
MediaMetadata: MediaMetadata,
ScreenPlay: ScreenPlay,
ScreenPlayScene: ScreenPlayScene,
SuggestedRaw: SuggestedRaw,
Video: Video,
VideoMetadata: VideoMetadata
    }