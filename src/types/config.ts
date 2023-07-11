import { GptConfig } from "./gptConfig";
import { MidjourneyConfig } from "./midjourneyConfig";

export interface Config {
  midjourney: MidjourneyConfig;
  gpt: GptConfig;
}
