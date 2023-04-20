/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { ClipResult } from './assets/resolvers/ClipResult';
import    { DemoItem } from './demo/resolvers/DemoItem';
import    { Mascot } from './demo/resolvers/Mascot';
import    { Media } from './assets/resolvers/Media';
import    { clipVideo as Mutation_clipVideo } from './assets/resolvers/Mutation/clipVideo';
import    { createMascot as Mutation_createMascot } from './demo/resolvers/Mutation/createMascot';
import    { deleteMedia as Mutation_deleteMedia } from './assets/resolvers/Mutation/deleteMedia';
import    { extractVideo as Mutation_extractVideo } from './assets/resolvers/Mutation/extractVideo';
import    { updateMedia as Mutation_updateMedia } from './assets/resolvers/Mutation/updateMedia';
import    { uploadMedia as Mutation_uploadMedia } from './assets/resolvers/Mutation/uploadMedia';
import    { getMedia as Query_getMedia } from './assets/resolvers/Query/getMedia';
import    { greetings as Query_greetings } from './demo/resolvers/Query/greetings';
import    { listMedia as Query_listMedia } from './assets/resolvers/Query/listMedia';
    export const resolvers: Resolvers = {
      Query: { getMedia: Query_getMedia,greetings: Query_greetings,listMedia: Query_listMedia },
      Mutation: { clipVideo: Mutation_clipVideo,createMascot: Mutation_createMascot,deleteMedia: Mutation_deleteMedia,extractVideo: Mutation_extractVideo,updateMedia: Mutation_updateMedia,uploadMedia: Mutation_uploadMedia },
      
      ClipResult: ClipResult,
DemoItem: DemoItem,
Mascot: Mascot,
Media: Media
    }