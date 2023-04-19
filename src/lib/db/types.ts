export type UserID = string & {
  readonly _: unique symbol;
};

export type CompanyID = string & {
  readonly _: unique symbol;
};

export type StaffID = string & {
  readonly _: unique symbol;
};

export enum MediaAssetType {
  image = "image",
  video = "video",
  audio = "audio",
}
