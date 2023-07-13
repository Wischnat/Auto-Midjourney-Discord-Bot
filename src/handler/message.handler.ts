import { Message } from "discord.js";
import { componentInteraction } from "../messages";

export const handleMessage = (message: Message) => {
  if (!message.author.bot) return;

  componentInteraction(message);
};
