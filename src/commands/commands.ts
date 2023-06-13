import { ChatInputCommand } from "../types/chatInputCommand";
import * as commandModules from "../commands/chatInputCommands/index";

export const chatInputCommands: ChatInputCommand[] = Object.values(commandModules);
