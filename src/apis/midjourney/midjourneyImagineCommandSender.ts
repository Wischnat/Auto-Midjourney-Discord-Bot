import axios from "axios";
import config from "../../config/config";
import { APIApplicationCommand } from "discord.js";
import { GPT } from "../gpt/gpt";
import { clearIntervalAsync, setIntervalAsync } from "set-interval-async";
import { midjourney } from "../../config/config.json";
import { Request } from "./request";
import { DiscordApplicationCommandPayload } from "../../types";

export class MidjourneyImagineCommandSender extends Request<DiscordApplicationCommandPayload> {
  private static _instance: MidjourneyImagineCommandSender;
  private _enableCommandSending: boolean;
  private _limit: number; //Default value -> Midjourney Basic Plan: ~200 / month
  private _intervalMS: number; // Discord Rate Limited < 2s
  private _gpt: GPT;
  // protected _midjourneyBotApplicationId: string = "936929561302675456";

  private constructor() {
    super();
    this._enableCommandSending = false;
    this._url = "https://discord.com/api/v9";
    this._limit = midjourney.limit;
    this._intervalMS = 2500;
    this._header = {
      headers: {
        Authorization: config.AUTHORIZATION,
        "Content-Type": `multipart/form-data`,
      },
    };
    this._gpt = new GPT();
  }

  public static async getInstance(): Promise<MidjourneyImagineCommandSender> {
    if (!this._instance) {
      this._instance = new MidjourneyImagineCommandSender();
    }
    return this._instance;
  }

  public sendCommands(): void {
    const url = `${this._url}/interactions`;
    let count: number = 0;
    let prompts: string[] = [];
    let promptCounter: number = 0;

    const interval = setIntervalAsync(async () => {
      if (this._limit <= count || !this._enableCommandSending) {
        await clearIntervalAsync(interval);
        return;
      }

      if (prompts.length === promptCounter) {
        promptCounter = 0;
        prompts = await this._gpt.generatePrompts();
      }

      (
        this._payload! as DiscordApplicationCommandPayload
      ).data!.options[0].value = prompts.at(promptCounter++);
      this._payload!.nonce = this.calcNonce();

      await axios.post(
        url,
        { payload_json: JSON.stringify(this._payload!) },
        this._header
      );
      count++;
    }, this._intervalMS);
  }

  public set enableCommandSending(value: boolean) {
    this._enableCommandSending = value;
  }

  public set limit(value: number) {
    this._limit = value;
  }

  public get gpt(): GPT {
    return this._gpt;
  }

  public async initData(
    channelId: string,
    guildId: string,
    applicationId: string
  ): Promise<void> {
    const application_commands: APIApplicationCommand[] =
      await this.getAPIApplicationCommands(channelId);

    if (application_commands.length === 0) {
      throw new Error("No API application commands found.");
    }

    const application_command: APIApplicationCommand =
      application_commands.at(0)!;

    this._payload = {
      type: 2,
      application_id: applicationId,
      guild_id: guildId,
      channel_id: channelId,
      session_id: this.generateSessionId(),
      data: {
        version: application_command.version,
        id: application_command.id,
        name: application_command.name,
        type: application_command.type,
        options: [
          {
            type: application_command.options!.at(0)!.type!,
            name: application_command.options!.at(0)!.name!,
            value: undefined,
          },
        ],
        application_command: application_command,
        attachments: [],
      },
      nonce: undefined,
    };
  }

  private async getAPIApplicationCommands(
    channelID: string
  ): Promise<APIApplicationCommand[]> {
    const type: string = "1";
    const query: string = "imagine";
    const limit: string = "7";
    const include_applications: string = "false";

    const params = new URLSearchParams({
      type,
      query,
      limit,
      include_applications,
    });

    const url: string = `${this._url}/channels/${channelID}/application-commands/search?${params}`;

    const {
      application_commands,
    }: { application_commands: APIApplicationCommand[] } = (
      await axios.get(url, this._header)
    ).data;

    return application_commands;
  }
}
