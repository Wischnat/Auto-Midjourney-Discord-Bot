import axios from "axios";
import { Attachment, Message } from "discord.js";
import path from "path";
import fs from "fs";
import { RealESRGAN } from "../apis";

export const attachmentMessage = (message: Message, realESRGAN: RealESRGAN) => {
  message.attachments.forEach(async (attachment: Attachment) => {
    const { url, name }: { url: string; name: string } = attachment;

    const upscaledImageUrl: string | null = await realESRGAN.run(url);
    if (upscaledImageUrl) await downloadImage(upscaledImageUrl, name);
  });
};

async function downloadImage(url: string, name: string): Promise<void> {
  const filepath: string = createFilepath(name);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve());
  });
}

const createFilepath = (name: string) => {
  const fileExtension: string = ".png";
  const posAfterDiscordName: number = name.search("_") + 1;
  const posFileExtension: number = name.search(fileExtension);
  const fileName: string = name.slice(posAfterDiscordName, posFileExtension);

  const imageDirectory: string = "./dist/images";
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory);
  }
  const imagePath: string = path.join(__dirname, "../images");
  const filepath: string = `${imagePath}/${fileName}${fileExtension}`;
  return filepath;
};
