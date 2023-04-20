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
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

export enum MediaAssetStatus {
  PENDING = "PENDING",
  READY = "READY",
  FAILED = "FAILED",
}
