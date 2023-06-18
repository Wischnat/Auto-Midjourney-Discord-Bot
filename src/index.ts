import { Client, GatewayIntentBits } from "discord.js";
import ready from "./events/ready.event";
import interactionCreate from "./events/interactionCreate.event";
import config from "./config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

ready(client);
interactionCreate(client);

client.login(config.MY_BOT_DISCORD_TOKEN);
