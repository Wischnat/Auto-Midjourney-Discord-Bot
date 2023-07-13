import Replicate from "replicate";
import config from "../../config/config";

export abstract class NightmareAI {
  protected _identifier1: string;
  protected _identifier2: string;
  protected _identifier3: string;
  protected _replicate: Replicate = new Replicate({
    auth: config.REPLICATE_API_KEY,
  });
  protected _enable: boolean;

  public abstract run(input: string): Promise<string | null>;
}
