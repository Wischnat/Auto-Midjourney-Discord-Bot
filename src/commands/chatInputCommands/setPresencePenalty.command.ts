import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const presencePenalty: number = interaction.options.data.at(0)
      ?.value! as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("gpt", "presencePenalty", presencePenalty);
    midjourneyImagineCommandSender.gpt.presencePenalty = presencePenalty;

    return await interaction.editReply(`Presence penalty: ${presencePenalty}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetPresencePenalty: ChatInputCommand = {
  name: "set-presence-penalty",
  description: `Increases the model's likelihood to talk about new topics`,
  run,
  options: [
    {
      name: "presence-penalty",
      description: "Values between 0 and 2",
      required: true,
      min_value: 0,
      max_value: 2,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
