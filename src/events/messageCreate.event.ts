import { Client, Message, MessageType } from "discord.js";
import { handleMessage } from "../handler";
import { RealESRGAN } from "../apis";

// https://stackoverflow.com/questions/69539318/discord-js-bot-not-firing-events-when-a-message-is-sent-after-update
export const messageCreateEvent = (
  client: Client,
  realESRGAN: RealESRGAN
): void => {
  client.on("messageCreate", async (message: Message) => {
    if (
      message.type === MessageType.Default ||
      message.type === MessageType.Reply
    ) {
      handleMessage(message, realESRGAN);
    }
  });
};
