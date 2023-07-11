import axios from "axios";
import { Attachment, Message } from "discord.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export const attachmentMessage = (message: Message) => {
  message.attachments.forEach(async (attachment: Attachment) => {
    // Each image has the same width and height.
    // Midjourney default image width/height is 1024px
    // Preview image => 2 * 1024px = 2048
    const { url, height, width, name } = attachment;
    const buffer = await downloadPreviewImage(url);
    const startPos = 0;

    await cropImage(buffer, name, height!, width!, startPos, startPos, "u1"); //left-top
    await cropImage(buffer, name, height!, width!, width!, startPos, "u2"); //right-top
    await cropImage(buffer, name, height!, width!, startPos, height!, "u3"); //left-bottom
    await cropImage(buffer, name, height!, width!, width!, height!, "u4"); //right-bottom
  });
};

async function downloadPreviewImage(url: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary");
}

// https://stackoverflow.com/questions/61628314/how-to-crop-screenshot-or-image-png-in-nodejs
const cropImage = async (
  buffer: Buffer,
  name: string,
  height: number,
  width: number,
  left: number,
  top: number,
  u: string
) => {
  const fileExtension = ".png";
  const posAfterDiscordName = name.search("_") + 1;
  const posFileExtension = name.search(fileExtension);
  const u_height = height / 2;
  const u_width = width / 2;
  const u_left = left / 2;
  const u_top = top / 2;
  const fileName = name.slice(posAfterDiscordName, posFileExtension);

  const imageDirectory = "./dist/images";
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory);
  }
  const imagePath = path.join(__dirname, "../images");

  await sharp(buffer)
    .extract({ left: u_left, top: u_top, width: u_width, height: u_height })
    .toFile(`${imagePath}/${fileName}.${u}${fileExtension}`);
};
