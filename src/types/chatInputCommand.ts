import {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from "discord.js";
import { Client } from "discord.js";

export interface ChatInputCommand extends ChatInputApplicationCommandData {
  run: (interaction: CommandInteraction, client: Client) => void;
}
