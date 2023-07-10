import axios from "axios";
import { Attachment, Message } from "discord.js";
export const attachmentMessage = (message: Message) => {
  message.attachments.forEach(async (attachment: Attachment) => {

    const { url, height, width, name } = attachment;
    const buffer = await downloadPreviewImage(url);

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
