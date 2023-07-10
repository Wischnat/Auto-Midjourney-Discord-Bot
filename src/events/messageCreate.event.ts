import { Client, Message, MessageType } from "discord.js";

// https://stackoverflow.com/questions/69539318/discord-js-bot-not-firing-events-when-a-message-is-sent-after-update
export const messageCreateEvent = (client: Client): void => {
  client.on("messageCreate", async (message: Message) => {
    if (message.type === MessageType.Default) {
      //handler
    }
  });
};
