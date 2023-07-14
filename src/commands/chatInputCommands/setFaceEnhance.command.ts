import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { RealESRGAN } from "../../apis";
import { updateConfig } from "../../utils";

const run = async (
  interaction: CommandInteraction,
  { realESRGAN }: { realESRGAN?: RealESRGAN }
) => {
  const enable: boolean = interaction.options.data.at(0)!.value as boolean;

  updateConfig("realESRGAN", "faceEnhance", enable);
  realESRGAN!.faceEnhance = enable;

  return await interaction.editReply(`Face Enhance: ${enable}`);
};

export const SetFaceEnhance: ChatInputCommand = {
  name: "set-face-enhance",
  description: `dis-/enable face enhance`,
  run,
  options: [
    {
      name: "enable",
      description: "dis-/enable face enhance",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
};
