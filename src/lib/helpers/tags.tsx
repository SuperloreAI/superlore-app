import { Tag } from "antd";
import { MediaAssetStatus, MediaAssetType } from "@/lib/db/types";

export const renderAssetTypeTag = (assetType: MediaAssetType) => {
  switch (assetType) {
    case MediaAssetType.AUDIO:
      return <Tag color="volcano">Audio</Tag>;
    case MediaAssetType.VIDEO:
      return <Tag color="blue">Video</Tag>;
    case MediaAssetType.IMAGE:
      return <Tag color="geekblue">Image</Tag>;
    default:
      return <Tag color="purple">Unknown Type</Tag>;
  }
};

export const renderAssetStatusTag = (assetStatus: MediaAssetStatus) => {
  switch (assetStatus) {
    case MediaAssetStatus.FAILED:
      return <Tag color="red">Red</Tag>;
    case MediaAssetStatus.PENDING:
      return <Tag color="orange">Pending</Tag>;
    case MediaAssetStatus.READY:
      return <Tag color="green">Ready</Tag>;
    default:
      return <Tag color="purple">Unknown Status</Tag>;
  }
};
