import "dotenv/config";
const { DISCORD_TOKEN, APPLICATION_ID, SERVER_ID } = process.env;

if (!DISCORD_TOKEN || !APPLICATION_ID || !SERVER_ID) {
  throw new Error(
    `Missing environment variables: DISCORD_TOKEN:${DISCORD_TOKEN} APPLICATION_ID:${APPLICATION_ID} SERVER_ID:${SERVER_ID}`
  );
}

const config: Record<string, string> = {
  DISCORD_TOKEN,
  APPLICATION_ID,
  SERVER_ID,
};

export default config;
