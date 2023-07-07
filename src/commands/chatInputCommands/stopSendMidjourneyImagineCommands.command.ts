import { CommandInteraction } from "discord.js";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import { ChatInputCommand } from "../../types/index";

const run = async (interaction: CommandInteraction) => {
  const midjourneyImagineCommandSender =
    await MidjourneyImagineCommandSender.getInstance();
  midjourneyImagineCommandSender.enableCommandSending = false;

  return await interaction.editReply("Sending commands has been stopped");
};

export const StopMidjourneyImagineCommands: ChatInputCommand = {
  name: "stop-midjourney-imagine-commands",
  description: 'stop "/imagine" midjourney commands',
  run,
};
