export interface SceneDetectProcessed {
  frame_asset_id: string;
  frame_url: string;
  scene_asset_id: string;
  scene_url: string;
  original_asset_id: string;
  original_asset_url: string;
}

export interface SceneDetectBatchBody {
  scenes: SceneDetectProcessed[];
  top_folder_level: string;
  title: string;
}
