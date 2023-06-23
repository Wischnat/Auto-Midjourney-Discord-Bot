import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const promptTopics: string = interaction.options.data.at(0)
      ?.value! as string;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "promptTopics", promptTopics);
    midjourneyImagineCommandSender.gpt.promptRole = promptTopics;

    return await interaction.editReply(`Prompt Topics: ${promptTopics}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetPromptTopics: ChatInputCommand = {
  name: "set-prompt-topics",
  description: `Add topics to your gpt prompt`,
  run,
  options: [
    {
      name: "prompt-topics",
      description: "gpt topics",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
