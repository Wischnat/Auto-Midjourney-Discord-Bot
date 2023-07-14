import { GptConfig } from "./gptConfig";
import { MidjourneyConfig } from "./midjourneyConfig";
import { RealESRGANConfig } from "./realESRGANConfig";

export interface Config {
  midjourney: MidjourneyConfig;
  gpt: GptConfig;
  realESRGAN: RealESRGANConfig;
}
