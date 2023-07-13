import {
  ButtonComponent,
  Message,
  MessageActionRowComponent,
  User,
} from "discord.js";
import { DiscordComponentInteraction } from "../apis";

export const componentInteraction = (message: Message) => {
  const midjourneyPreviewComponentInteraction: DiscordComponentInteraction =
    new DiscordComponentInteraction();
  const { guildId, channelId, id, flags, author }: Message = message;
  const { id: authorId }: User = author;
  const uRow =
    message.components.length > 0 ? message.components.at(0) : undefined;

  uRow?.components.forEach(async (component: MessageActionRowComponent) => {
    if (component instanceof ButtonComponent) {
      const { label, customId, type }: ButtonComponent = component;
      if (isStandaloneButton(label!)) {
        await midjourneyPreviewComponentInteraction.sendInteraction(
          type,
          customId!,
          guildId!,
          channelId,
          id,
          flags,
          authorId!
        );
      }
    }
  });
};

const isStandaloneButton = (label: string) => {
  const standaloneButtonChar: string = "U";
  return label?.includes(standaloneButtonChar);
};
