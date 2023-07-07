import {
  APIApplicationCommand,
  ApplicationCommandType,
  CommandInteractionOption,
} from "discord.js";

export interface DiscordAPIPayload {
  type: ApplicationCommandType;
  application_id: string;
  guild_id: string;
  channel_id?: string;
  session_id: string;
  data: {
    version: string;
    id: string;
    name: string;
    type: ApplicationCommandType;
    options: CommandInteractionOption[];
    application_command: APIApplicationCommand;
    attachments: unknown[];
  };
  nonce?: string;
}
