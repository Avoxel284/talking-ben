# My Talking Ben

A Discord bot that plays sounds from the My Talking Ben app in voice channels.
A live version is hosted [here](https://discord.com/api/oauth2/authorize?client_id=943819319748481095&permissions=36702208&scope=bot)

## Installation

1. Create a new Discord Bot [here](https://discord.com/developers/applications) and invite it to your server
2. Create a file named `.env` in the root of your directory and put the following inside:

```
DISCORD_TOKEN = <put your discord token here>
```

3. Install node packages `npm i`
4. Run the bot `node .`
5. Join a voice channel and type this command in any text channel: `!startben`.

## Configuration

In the project root directory, there is a file named `config.json`. Below are the configurable settings and their description:

### TOKEN

Your bot's Discord token.

### RESPOND_ON_MEMBER_VOICE_STATE

If `true`, the bot will instead wait for a user to speak then respond rather than wait a random time between 1 to 4 seconds.

### JOIN_AUTOMATICALLY

If `true`, the bot will automatically join a voice channel when a user joins. Please note if the bot is in another channel already, it won't move.
