import { Message } from "discord.js";
import { attachmentMessage, componentInteraction } from "../messages";
import { RealESRGAN } from "../apis";

export const handleMessage = (message: Message, realESRGAN: RealESRGAN) => {
  if (!message.author.bot) return;

  if (isStandaloneImage(message)) {
    attachmentMessage(message, realESRGAN);
  } else {
    componentInteraction(message);
  }
};

const isStandaloneImage = (message: Message) => {
  const standaloneImageIndicator = "Image #";
  return message.content.includes(standaloneImageIndicator);
};
