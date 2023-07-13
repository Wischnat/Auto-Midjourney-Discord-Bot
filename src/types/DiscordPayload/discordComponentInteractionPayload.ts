import { ComponentType, MessageFlagsBitField } from "discord.js";
import { DiscordAPIPayload } from "./discordAPIPayload";

export interface DiscordComponentInteractionPayload extends DiscordAPIPayload {
  data?: { component_type: ComponentType; custom_id: string };
  message_flags?: Readonly<MessageFlagsBitField>;
  message_id?: string;
}
