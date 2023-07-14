import { Client, GatewayIntentBits } from "discord.js";
import config from "./config/config";
import errorHandler from "./handler/error.handler";
import {
  interactionCreateEvent,
  messageCreateEvent,
  readyEvent,
} from "./events";
import { RealESRGAN } from "./apis";

// GatewayIntentBits.MessageContent
// https://stackoverflow.com/questions/64006888/discord-js-bot-disallowed-intents-privileged-intent-provided-is-not-enabled-o
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const realESRGAN: RealESRGAN = new RealESRGAN();

readyEvent(client);
interactionCreateEvent(client, realESRGAN);
messageCreateEvent(client, realESRGAN);
errorHandler(client);

client.login(config.MY_BOT_DISCORD_TOKEN);
