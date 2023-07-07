import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const frequencyPenalty: number = interaction.options.data.at(0)!
      .value as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "frequencyPenalty", frequencyPenalty);
    midjourneyImagineCommandSender.gpt.frequencyPenalty = frequencyPenalty;

    return await interaction.editReply(
      `Frequency penalty: ${frequencyPenalty}`
    );
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetFrequencyPenalty: ChatInputCommand = {
  name: "set-frequency-penalty",
  description: `Decreases the model's likelihood to repeat the same line verbatim.`,
  run,
  options: [
    {
      name: "frequency-penalty",
      description: "Values between 0 and 2",
      required: true,
      min_value: 0,
      max_value: 2,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
