import { CommandInteraction, Client, Interaction } from "discord.js";
import { ChatInputCommand } from "../types/index";
import { chatInputCommands } from "../commands/commands";

export const interactionCreateEvent = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleCommand(client, interaction);
    }
  });
};

const handleCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const command: ChatInputCommand | undefined = chatInputCommands.find(
    (command) => command.name === interaction.commandName
  );

  if (!command) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  await interaction.deferReply();

  command.run(interaction, client);
};
