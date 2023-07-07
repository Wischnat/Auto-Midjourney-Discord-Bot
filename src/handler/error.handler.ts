import { Channel, ChannelType, Client, EmbedBuilder } from "discord.js";
import config from "../config/config";

export default (client: Client): void => {
  const channelID = config.ERROR_CHANNEL_ID;
  const embed = new EmbedBuilder().setColor("Red");

  process.on("unhandledRejection", (error, promise) => {
    sendEmbed(
      error,
      promise,
      client,
      channelID,
      embed
        .setTimestamp()
        .setDescription(
          "**Unhandled Rejection/Catch:\n\n** ```" + error + "```"
        )
        .setTitle(`⚠ | Error Encountered`)
    );
  });

  process.on("uncaughtException", (error, promise) => {
    sendEmbed(
      error,
      promise,
      client,
      channelID,
      embed
        .setTimestamp()
        .setDescription(
          "**Uncaught Exception/Catch:\n\n** ```" +
            error +
            "\n\n" +
            origin.toString() +
            "```"
        )
        .setTitle(`⚠ | Error Encountered`)
    );
  });

  process.on("uncaughtException", (error, promise) => {
    sendEmbed(
      error,
      promise,
      client,
      channelID,
      embed
        .setTimestamp()
        .setDescription(
          "**Uncaught Exception/Catch (MONITOR):\n\n** ```" +
            error +
            "\n\n" +
            origin.toString() +
            "```"
        )
        .setTitle(`⚠ | Error Encountered`)
    );
  });
};

const sendEmbed = (
  error: unknown,
  promise: Promise<unknown> | NodeJS.UncaughtExceptionOrigin,
  client: Client<boolean>,
  channelID: string,
  embed: EmbedBuilder
) => {
  console.log(error, promise);
  // https://github.com/discordjs/discord.js/issues/3622
  const channel: Channel = client.channels.cache.get(channelID)!;
  if (channel.type === ChannelType.GuildText) {
    channel.send({
      embeds: [embed],
    });
  }
};
