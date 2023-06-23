import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const maxPrompts: number = interaction.options.data.at(0)?.value! as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "maxPrompts", maxPrompts);
    midjourneyImagineCommandSender.gpt.maxPrompts = maxPrompts;

    return await interaction.editReply(`Max prompts: ${maxPrompts}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetMaxPrompts: ChatInputCommand = {
  name: "set-max-prompts",
  description: "The maximum number of midjourney prompts per gpt request.",
  run,
  options: [
    {
      name: "max-prompts",
      description: "A value between 1 and 100",
      required: true,
      min_value: 1,
      max_value: 100,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
