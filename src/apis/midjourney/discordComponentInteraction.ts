import axios from "axios";
import config from "../../config/config";
import {
  ApplicationCommandType,
  ComponentType,
  MessageFlagsBitField,
} from "discord.js";
import { DiscordComponentInteractionPayload } from "../../types";
import { Request } from "./request";

export class DiscordComponentInteraction extends Request<DiscordComponentInteractionPayload> {
  public constructor() {
    super();
    this._url = "https://discord.com/api/v9/interactions";
    this._header = {
      headers: {
        Authorization: config.AUTHORIZATION,
        "content-type": "application/json",
      },
    };
    this._payload = {
      type: ApplicationCommandType.Message,
      application_id: undefined,
      guild_id: undefined,
      channel_id: undefined,
      session_id: this.generateSessionId(),
      data: undefined,
      nonce: undefined,
      message_flags: undefined,
      message_id: undefined,
    } as DiscordComponentInteractionPayload;
  }

  public async sendInteraction(
    componentType: ComponentType,
    customId: string,
    guildId: string,
    channelId: string,
    messageId: string,
    messageFlags: Readonly<MessageFlagsBitField>,
    applicationId: string
  ) {
    this._payload!.nonce = this.calcNonce();
    this._payload.guild_id = guildId;
    this._payload.channel_id = channelId;
    this._payload.data = { component_type: componentType, custom_id: customId };
    (this._payload as DiscordComponentInteractionPayload).message_id =
      messageId;
    (this._payload as DiscordComponentInteractionPayload).message_flags =
      messageFlags;
    (this._payload as DiscordComponentInteractionPayload).application_id =
      applicationId;

    await axios.post(this._url, this._payload, this._header);
  }
}
