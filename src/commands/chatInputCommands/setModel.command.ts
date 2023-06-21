import {
  ApplicationCommandOptionChoiceData,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { ChatInputCommand } from "../../types/chatInputCommand";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import fs from "fs";
import path from "path";
import config from "../../config/config.json";

const run = async (interaction: CommandInteraction) => {
  try {
    const model: string = interaction.options.data.at(0)?.value! as string;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();
    const maxTokens: number =
      midjourneyImagineCommandSender.gpt.models.get(model)!;

    config.gpt.model = model;
    config.gpt.maxTokens = maxTokens;
    const filePath = path.join(__dirname, "../../config/config.json");
    fs.writeFileSync(filePath, JSON.stringify(config));

    midjourneyImagineCommandSender.gpt.model = model;
    midjourneyImagineCommandSender.gpt.maxTokens = maxTokens;

    return await interaction.editReply(
      `Model: ${model}\nMax Tokens: ${maxTokens}`
    );
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetModel: ChatInputCommand = {
  name: "set-model",
  description: `The model generates completions. 
  Some are for language tasks, others specialize in code.`,
  run,
  options: [],
};

(async () => {
  const midjourneyImagineCommandSender =
    await MidjourneyImagineCommandSender.getInstance();
  const choices: ApplicationCommandOptionChoiceData<string>[] = [];

  midjourneyImagineCommandSender.gpt.models.forEach(
    (value: number, key: string) => {
      choices.push({ name: key, value: key });
    }
  );

  SetModel.options = [
    {
      name: "model",
      description: `Attention, the max tokens will be set to the maximum value allowed by the respective model`,
      required: true,
      type: ApplicationCommandOptionType.String,
      choices,
    },
  ];
})();
