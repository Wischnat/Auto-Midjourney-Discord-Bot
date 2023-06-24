import fs from "fs";
import path from "path";
import { Config } from "../types/index";

const configFilePath = path.join(__dirname, "../config/config.json");
const config: Config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));

export const updateConfig = <T extends keyof Config, K extends keyof Config[T]>(
  object: T,
  key: K,
  value: Config[T][K]
) => {
  config[object][key] = value;
  fs.writeFileSync(configFilePath, JSON.stringify(config));
};
