import { ApplicationCommandType } from "discord.js";

export interface DiscordAPIPayload {
  type: ApplicationCommandType;
  application_id?: string;
  guild_id?: string;
  channel_id?: string;
  session_id: string;
  nonce?: string;
}
