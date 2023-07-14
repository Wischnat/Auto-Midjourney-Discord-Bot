import { CommandInteraction, Client, Interaction } from "discord.js";
import { ChatInputCommand } from "../types/index";
import { chatInputCommands } from "../commands/commands";
import { RealESRGAN } from "../apis";

export const interactionCreateEvent = (
  client: Client,
  realESRGAN: RealESRGAN
): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleCommand(client, interaction, realESRGAN);
    }
  });
};

const handleCommand = async (
  client: Client,
  interaction: CommandInteraction,
  realESRGAN: RealESRGAN
): Promise<void> => {
  const command: ChatInputCommand | undefined = chatInputCommands.find(
    (command) => command.name === interaction.commandName
  );

  if (!command) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  await interaction.deferReply();

  command.run(interaction, { client, realESRGAN });
};
