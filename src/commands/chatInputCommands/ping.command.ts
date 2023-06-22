import { CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";

const run = async (interaction: CommandInteraction) => {
  return await interaction.editReply("Pong!");
};

export const Ping: ChatInputCommand = {
  name: "ping",
  description: "reply pong",
  run,
};
