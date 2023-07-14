import {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from "discord.js";
import { Client } from "discord.js";
import { RealESRGAN } from "../apis";

export interface ChatInputCommand extends ChatInputApplicationCommandData {
  run: (
    interaction: CommandInteraction,
    { client, realESRGAN }: { client?: Client; realESRGAN?: RealESRGAN }
  ) => void;
}
