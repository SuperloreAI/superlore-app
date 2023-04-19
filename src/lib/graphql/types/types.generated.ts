import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  status: MediaStatus;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type MediaStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'PROCESSING';

export type Mutation = {
  __typename: 'Mutation';
  createMascot: Mascot;
  createVideoTrim?: Maybe<Media>;
  deleteMedia?: Maybe<Media>;
  extractVideo?: Maybe<Array<Scalars['String']>>;
  updateMedia?: Maybe<Media>;
  uploadMedia?: Maybe<Media>;
};


export type MutationCreateMascotArgs = {
  name: Scalars['String'];
};


export type MutationCreateVideoTrimArgs = {
  endTime: Scalars['Float'];
  id: Scalars['ID'];
  startTime: Scalars['Float'];
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DemoItem: ResolverTypeWrapper<DemoItem>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mascot: ResolverTypeWrapper<Mascot>;
  Media: ResolverTypeWrapper<Media>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  MediaStatus: MediaStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  VideoType: VideoType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DemoItem: DemoItem;
  String: Scalars['String'];
  Mascot: Mascot;
  Media: Media;
  ID: Scalars['ID'];
  Mutation: {};
  Float: Scalars['Float'];
  Query: {};
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MediaStatus'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMascot?: Resolver<ResolversTypes['Mascot'], ParentType, ContextType, RequireFields<MutationCreateMascotArgs, 'name'>>;
  createVideoTrim?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationCreateVideoTrimArgs, 'endTime' | 'id' | 'startTime'>>;
  deleteMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationDeleteMediaArgs, 'id'>>;
  extractVideo?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, RequireFields<MutationExtractVideoArgs, 'type' | 'url'>>;
  updateMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationUpdateMediaArgs, 'id'>>;
  uploadMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<MutationUploadMediaArgs, 'title' | 'url'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QueryGetMediaArgs, 'id'>>;
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGreetingsArgs, 'input'>>;
  listMedia?: Resolver<Maybe<Array<Maybe<ResolversTypes['Media']>>>, ParentType, ContextType, Partial<QueryListMediaArgs>>;
};

export type Resolvers<ContextType = any> = {
  DemoItem?: DemoItemResolvers<ContextType>;
  Mascot?: MascotResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

