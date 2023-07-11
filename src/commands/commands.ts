import { ChatInputCommand } from "../types/index";
import * as commandModules from "../commands/chatInputCommands/index";

export const chatInputCommands: ChatInputCommand[] = Object.values(commandModules);
