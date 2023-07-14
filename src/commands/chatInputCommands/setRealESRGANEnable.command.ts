import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { RealESRGAN } from "../../apis";
import { updateConfig } from "../../utils";

const run = async (
  interaction: CommandInteraction,
  { realESRGAN }: { realESRGAN?: RealESRGAN }
) => {
  const enable: boolean = interaction.options.data.at(0)!.value as boolean;

  updateConfig("realESRGAN", "enable", enable);
  realESRGAN!.enable = enable;

  return await interaction.editReply(`RealESRGAN Enable: ${enable}`);
};

export const SetRealESRGANEnable: ChatInputCommand = {
  name: "set-real-esrgan-enable",
  description: `dis-/enable image upscaling`,
  run,
  options: [
    {
      name: "enable",
      description: "dis-/enable image upscaling",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
};
