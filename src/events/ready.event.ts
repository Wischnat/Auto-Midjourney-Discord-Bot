import { Client } from "discord.js";
import { chatInputCommands } from "../commands/commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }
    
    console.log("Bot is starting");
    await client.application.commands.set(chatInputCommands);
    console.log(`${client.user.username} is online`);
  });
};
