import { APIApplicationCommand, ApplicationCommandType, CommandInteractionOption } from "discord.js";
import { DiscordAPIPayload } from "./discordAPIPayload";

export interface DiscordApplicationCommandPayload extends DiscordAPIPayload {
    data?: {
      version: string;
      id: string;
      name: string;
      type: ApplicationCommandType;
      options: CommandInteractionOption[];
      application_command: APIApplicationCommand;
      attachments: unknown[];
    };
  }