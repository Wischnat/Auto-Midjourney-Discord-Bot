import { Client, GatewayIntentBits } from "discord.js";
import ready from "./events/ready.event";
import config from "./config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

ready(client);

client.login(config.DISCORD_TOKEN);
