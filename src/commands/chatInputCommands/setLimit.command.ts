import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/chatInputCommand";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { updateConfig } from "../../utils";

const run = async (interaction: CommandInteraction) => {
  try {
    const limit: number = interaction.options.data.at(0)?.value! as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    updateConfig("midjourney", "limit", limit);
    midjourneyImagineCommandSender.limit = limit;

    return await interaction.editReply(`Limit: ${limit}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetLimit: ChatInputCommand = {
  name: "set-limit",
  description: `The maximum number of images to be generated.
  The value -1 sets the limit to infinity.`,
  run,
  options: [
    {
      name: "limit",
      description: `max images`,
      required: true,
      min_value: -1,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
