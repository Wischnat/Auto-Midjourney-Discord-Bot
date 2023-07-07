import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const promptRole: string = interaction.options.data.at(0)!.value as string;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "promptRole", promptRole);
    midjourneyImagineCommandSender.gpt.promptRole = promptRole;

    return await interaction.editReply(`Prompt role: ${promptRole}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetPromptRole: ChatInputCommand = {
  name: "set-prompt-role",
  description: `Add a role(context) to your gpt prompt`,
  run,
  options: [
    {
      name: "prompt-role",
      description: "gpt role",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
