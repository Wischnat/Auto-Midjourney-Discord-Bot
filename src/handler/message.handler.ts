import { Message } from "discord.js";
import { attachmentMessage } from "../messages";

export const handleMessage = (message: Message) => {
  
  if (!message.author.bot) return;

  attachmentMessage(message);
};
