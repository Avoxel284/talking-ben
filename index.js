const discord = require("discord.js");
const fs = require("fs");
const { Client, Intents } = require("discord.js");
const discordVoice = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
	partials: ["CHANNEL"],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
const sounds = [];

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

client.login(process.env.DISCORD_TOKEN);

client.on("ready", (bot) => {
	console.log(`Logged in as ${bot.user.username}`);

	fs.readdir("./sounds", (err, files) => {
		if (err) return console.error(err);
		files.forEach((file) => {
			sounds.push("./sounds/" + file);
		});
	});
});

client.on("messageCreate", async (msg) => {
	if (msg.content.toLowerCase() == "!startben") {
		const voiceChannel = msg?.member?.voice?.channel;
		if (!voiceChannel) return msg.reply("You aren't in a VC!");

		const connection = discordVoice.joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: msg.guild.voiceAdapterCreator,
		});
		const player = discordVoice.createAudioPlayer({
			behaviors: {
				noSubscriber: discordVoice.NoSubscriberBehavior.Play,
			},
		});

		connection.subscribe(player);

		player.play(
			discordVoice.createAudioResource(sounds[getRandomInt(0, sounds.length)]),
			voiceChannel.id,
			msg.guild.id
		);

		player.on("stateChange", (oldState, newState) => {
			if (
				newState.status === discordVoice.AudioPlayerStatus.Idle &&
				oldState.status !== discordVoice.AudioPlayerStatus.Idle
			) {
				setTimeout(() => {
					player.play(
						discordVoice.createAudioResource(sounds[getRandomInt(0, sounds.length)]),
						voiceChannel.id,
						msg.guild.id
					);
				}, getRandomInt(1, 4) * 1000);
			}
		});
	}
});
