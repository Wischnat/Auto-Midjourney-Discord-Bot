import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const topP: number = interaction.options.data.at(0)!.value as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "topP", topP);
    midjourneyImagineCommandSender.gpt.topP = topP;

    return await interaction.editReply(`Top P: ${topP}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetTopP: ChatInputCommand = {
  name: "set-top-p",
  description: `Controls diversity via nucleus sampling`,
  run,
  options: [
    {
      name: "top-p",
      description:
        "Values between 0 and 1. 0.5 means half of all likelihood-weighted options are considered.",
      required: true,
      min_value: 0,
      max_value: 1,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
