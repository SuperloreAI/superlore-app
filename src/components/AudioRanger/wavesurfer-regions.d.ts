// src/wavesurfer-regions.d.ts
declare module "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js" {
  import { WaveSurferPlugin, WaveSurferPluginDefinition } from "wavesurfer.js";

  export interface RegionsPluginParams {
    dragSelection?: {
      slop?: number;
    };
  }

  export interface RegionsPlugin extends WaveSurferPlugin {}

  const RegionsPlugin: WaveSurferPluginDefinition;
  export default RegionsPlugin;
}
