import { Client } from "discord.js";
import { chatInputCommands } from "../commands/commands";

export const readyEvent =  (client: Client): void => {
  client.on("ready", async () => {
    try {
      if (!client.user || !client.application) {
        return;
      }

      console.log("Bot is starting");
      await client.application.commands.set(chatInputCommands);
      console.log(`${client.user.username} is online`);
    } catch (error: any) {
      console.error(error.message);
    }
  });
};
