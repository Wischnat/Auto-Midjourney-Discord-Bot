# Auto-Midjourney-Discord-Bot

## Setup

### Download and Dependencies

1. Download

   ```sh
   git clone https://github.com/Wischnat/Auto-Midjourney-Discord-Bot.git
   ```

2. Install dependencies
   ```sh
   npm i
   ```

### Environment Variables

1. Create in a .env file in the root of your project
2. Insert your key/value pairs

   `MY_BOT_DISCORD_TOKEN`: Available after creating the discord bot

   `MY_BOT_APPLICATION_ID`: Available after creating the discord bot

   `AUTHORIZATION`:

   1. Open [Discord](https://discord.com/channels/@me) in your browser  
   2. Open `DevTools`(ctrl + shift + i)
   3. Click `"Network"` from the toolbar at the top
   4. Reload the page `(F5)`
   5. Type `"/api"` in the filter
   6. Click on the `"library" request`
   7. Click the `"Headers"` tab and search for `"authorization"`
   8. Copy and paste this to `AUTHORIZATION`
   
   `OPENAI_API_KEY`:

   1. Go to [OpenAI API keys](https://platform.openai.com/account/api-keys)
   2. Click `"Create new secret key"` and give your key a name.
   3. Copy your token and past this to `"OPENAI_API_KEY"`

   `ERROR_CHANNEL_ID`:
   Available after creating the discord server

   ```sh
   MY_BOT_DISCORD_TOKEN=
   MY_BOT_APPLICATION_ID=
   AUTHORIZATION=
   OPENAI_API_KEY=
   ERROR_CHANNEL_ID=
   ```

### Create Discord Server & Bot

1. Create a new Discord Server
   1. Click on`"Advanced"` in your `Discord Settings` and enable `"Developer Mode"`.
   2. Click the `"+" button` on the left hand column
   3. Click `"Create My Own"`
   4. Name your server and click "Create"
   5. Create a new channel `(error channel)`
   6. Right click on your new channel and click `"Copy Channel ID"`
   7. Paste the channel id in your `".env"` under `"ERROR_CHANNEL_ID"`.
2. Create a new Discord Bot
   1. Go to [Developer Portal Applications](https://discord.com/developers/applications)
   2. Click on `"New Application"`
   3. Give your bot a name and then click on `“Create”`.
   4. Go to `"General Information"` and copy the `"APPLICATION ID"` then past this in your `".env"` under `"MY_BOT_APPLICATION_ID"`.
   5. Go to `"Bot"` and click on `"Reset Token"`. Then
      copy your `Bot Token` and C
   6. Go to `"OAuth2 URL Generator"` and in the field `"SCOPES"` check the box `"bot"`.
   7. In the field `"BOT PERMISSIONS"` check the boxes `"Read Messages/View Channels", "Send Messages", "Manage Messages", "Use Slash Commands", "Read Message History"`.
   8. Copy the generated url and add your bot to your server.

## Default Configs

   The configurations can be changed using Slash Commands.
   ```sh
   {
   "midjourney": {
   "limit": 200
   },
   "gpt": {
   "model": "text-davinci-003",
   "maxTokens": 4000,
   "temperature": 1,
   "topP": 1,
   "frequencyPenalty": 0,
   "presencePenalty": 0,
   "promptRole": "Assume the role of a midjourney (image creation) prompt creator.",
   "maxPrompts": 2,
   "promptTopics": "Nature, Night, lake,"
   }
   ```