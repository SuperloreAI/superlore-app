import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AssetType =
  | 'AUDIO'
  | 'IMAGE'
  | 'VIDEO';

export type AudioMetadata = {
  __typename: 'AudioMetadata';
  audioCodec?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  originalSource?: Maybe<Scalars['String']>;
};

export type ClipResult = {
  __typename: 'ClipResult';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type DemoItem = {
  __typename: 'DemoItem';
  message: Scalars['String'];
};

export type Mascot = {
  __typename: 'Mascot';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Media = {
  __typename: 'Media';
  assetType: AssetType;
  id: Scalars['ID'];
  metadata?: Maybe<MediaMetadata>;
  notes?: Maybe<Scalars['String']>;
  status: MediaStatus;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MediaMetadata = AudioMetadata | VideoMetadata;

export type MediaStatus =
  | 'FAILED'
  | 'PENDING'
  | 'READY';

export type Mutation = {
  __typename: 'Mutation';
  clipVideo?: Maybe<ClipResult>;
  createMascot: Mascot;
  deleteMedia?: Maybe<Media>;
  extractVideo?: Maybe<Array<Scalars['String']>>;
  updateMedia: Scalars['ID'];
  uploadMedia?: Maybe<Media>;
};


export type MutationClipVideoArgs = {
  endTime: Scalars['Float'];
  id: Scalars['ID'];
  startTime: Scalars['Float'];
  title: Scalars['String'];
  url: Scalars['String'];
};


export type MutationCreateMascotArgs = {
  name: Scalars['String'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['ID'];
};


export type MutationExtractVideoArgs = {
  type: VideoType;
  url: Scalars['String'];
};


export type MutationUpdateMediaArgs = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUploadMediaArgs = {
  notes?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename: 'Query';
  getMedia?: Maybe<Media>;
  greetings: Scalars['String'];
  listMedia?: Maybe<Array<Maybe<Media>>>;
  listVideos?: Maybe<Array<Maybe<Video>>>;
};


export type QueryGetMediaArgs = {
  id: Scalars['ID'];
};


export type QueryGreetingsArgs = {
  input: Scalars['String'];
};


export type QueryListMediaArgs = {
  cursorStart?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchString?: InputMaybe<Scalars['String']>;
};


export type QueryListVideosArgs = {
  cursorStart?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchString?: InputMaybe<Scalars['String']>;
};

export type Video = {
  __typename: 'Video';
  archived: Scalars['Boolean'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  metadata?: Maybe<VideoMetadata>;
  notes?: Maybe<Scalars['String']>;
  primaryMascotId?: Maybe<Scalars['ID']>;
  prompt?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type VideoMetadata = {
  __typename: 'VideoMetadata';
  aspectRatio?: Maybe<Scalars['String']>;
  audioCodec?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  frameRate?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  originalSource?: Maybe<Scalars['String']>;
  videoCodec?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type VideoType =
  | 'TIKTOK'
  | 'YOUTUBE';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  MediaMetadata: ( AudioMetadata ) | ( VideoMetadata );
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  MediaMetadata: ( AudioMetadata ) | ( VideoMetadata );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssetType: AssetType;
  AudioMetadata: ResolverTypeWrapper<AudioMetadata>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ClipResult: ResolverTypeWrapper<ClipResult>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DemoItem: ResolverTypeWrapper<DemoItem>;
  Mascot: ResolverTypeWrapper<Mascot>;
  Media: ResolverTypeWrapper<Omit<Media, 'metadata'> & { metadata?: Maybe<ResolversTypes['MediaMetadata']> }>;
  MediaMetadata: ResolverTypeWrapper<ResolversUnionTypes['MediaMetadata']>;
  MediaStatus: MediaStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Video: ResolverTypeWrapper<Video>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  VideoMetadata: ResolverTypeWrapper<VideoMetadata>;
  VideoType: VideoType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AudioMetadata: AudioMetadata;
  String: Scalars['String'];
  Float: Scalars['Float'];
  ClipResult: ClipResult;
  ID: Scalars['ID'];
  DemoItem: DemoItem;
  Mascot: Mascot;
  Media: Omit<Media, 'metadata'> & { metadata?: Maybe<ResolversParentTypes['MediaMetadata']> };
  MediaMetadata: ResolversUnionParentTypes['MediaMetadata'];
  Mutation: {};
  Query: {};
  Int: Scalars['Int'];
  Video: Video;
  Boolean: Scalars['Boolean'];
  VideoMetadata: VideoMetadata;
};

export type AudioMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AudioMetadata'] = ResolversParentTypes['AudioMetadata']> = {
  audioCodec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  originalSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClipResult'] = ResolversParentTypes['ClipResult']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DemoItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['DemoItem'] = ResolversParentTypes['DemoItem']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MascotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mascot'] = ResolversParentTypes['Mascot']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  assetType?: Resolver<ResolversTypes['AssetType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['MediaMetadata']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MediaStatus'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaMetadata'] = ResolversParentTypes['MediaMetadata']> = {
  __resolveType: TypeResolveFn<'AudioMetadata' | 'VideoMetadata', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  clipVideo?: Resolver<Maybe<ResolversTypes['ClipResult']>, ParentType, ContextType, RequireFields<MutationClipVideoArgs, 'endTime' | 'id' | 'startTime' | 'title' | 'url'>>;
  createMascot?: Resolver<ResolversTypes['Mascot'], ParentType, ContextType, RequireFields<MutationCreateMascotArgs, 'name'>>;
  deleteMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationDeleteMediaArgs, 'id'>>;
  extractVideo?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, RequireFields<MutationExtractVideoArgs, 'type' | 'url'>>;
  updateMedia?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateMediaArgs, 'id'>>;
  uploadMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationUploadMediaArgs, 'title' | 'url'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QueryGetMediaArgs, 'id'>>;
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGreetingsArgs, 'input'>>;
  listMedia?: Resolver<Maybe<Array<Maybe<ResolversTypes['Media']>>>, ParentType, ContextType, Partial<QueryListMediaArgs>>;
  listVideos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType, Partial<QueryListVideosArgs>>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['VideoMetadata']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryMascotId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  prompt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMetadata'] = ResolversParentTypes['VideoMetadata']> = {
  aspectRatio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  audioCodec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  frameRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originalSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoCodec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AudioMetadata?: AudioMetadataResolvers<ContextType>;
  ClipResult?: ClipResultResolvers<ContextType>;
  DemoItem?: DemoItemResolvers<ContextType>;
  Mascot?: MascotResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  MediaMetadata?: MediaMetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoMetadata?: VideoMetadataResolvers<ContextType>;
};

