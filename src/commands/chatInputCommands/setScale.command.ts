import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/index";
import { RealESRGAN } from "../../apis";
import { updateConfig } from "../../utils";

const run = async (
  interaction: CommandInteraction,
  { realESRGAN }: { realESRGAN?: RealESRGAN }
) => {
  const scale: number = interaction.options.data.at(0)!.value as number;

  updateConfig("realESRGAN", "scale", scale);
  realESRGAN!.scale = scale;

  return await interaction.editReply(`Scale: ${scale}`);
};

export const SetScale: ChatInputCommand = {
  name: "set-scale",
  description: `set scale factor between 0.5 and 10`,
  run,
  options: [
    {
      name: "scale",
      description: "Scale: 0.5-10",
      required: true,
      min_value: 0.5,
      max_value: 10,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
