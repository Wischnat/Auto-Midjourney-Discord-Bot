import { NightmareAI } from "./nightmareAI";
import { realESRGAN } from "../../config/config.json";

// https://replicate.com/nightmareai/real-esrgan/api
export class RealESRGAN extends NightmareAI {
  private _scale: number;
  private _faceEnhance: boolean;

  public constructor() {
    super();
    this._identifier1 = "nightmareai";
    this._identifier2 = "real-esrgan";
    this._identifier3 =
      "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b";
    this._enable = realESRGAN.enable;
    this._scale = realESRGAN.scale;
    this._faceEnhance = realESRGAN.faceEnhance;
  }

  // Default image (1024x1024): x10 => 16.46 seconds
  // Pan image (1536x1024): x10 => 25.96 seconds
  // Preview image (2048x2048): x10 => error
  public async run(input: string): Promise<string | null> {
    if (!this._enable) return null;

    const url: string = (await this._replicate.run(
      `${this._identifier1}/${this._identifier2}:${this._identifier3}`,
      {
        input: {
          image: input,
          scale: this._scale,
          face_enhance: this._faceEnhance,
        },
      }
    )) as unknown as string;

    return url;
  }

  public set scale(value: number) {
    this._scale = value;
  }
}
