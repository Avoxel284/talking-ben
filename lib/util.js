// Avoxel284
// Utility module

const discord = require("discord.js");

/**
 * Returns the amount of characters in a given array
 *
 * @param {Array} arr
 */
exports.getCharactersInArray = (arr) => {
	let v = 0;
	arr.forEach((w) => {
		if (typeof w != "string") return;
		v += w.split("").length;
	});
	return v;
};

/**
 * Returns an array with chunks from a given array with specified amount of characters
 *
 * @param {Array} arr Array
 * @param {Number} characters Total number of characters in each chunk
 */
exports.chunkArrayCharacters = (arr, characters) => {
	if (this.getCharactersInArray(arr) < characters) return [arr];
	let chunks = [],
		chars = 0, // temporary character amount
		temp = []; // temporary array
	arr.forEach((e) => {
		if (typeof e != "string") return;
		eChars = e.split("").length;
		chars += eChars;
		temp.push(e);
		if (chars >= characters || chars + eChars > characters) {
			chunks.push(temp);
			chars = 0;
			temp = [];
		}
	});
	return chunks;
};

/**
 * Returns an array with chunks from a given array with specified amount of elements
 *
 * @param {Array} arr Array
 * @param {Number} len Total number of elements in chunk
 */
exports.chunkArray = (arr, len) => {
	let chunks = [],
		i = 0,
		n = arr.length;
	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}
	return chunks;
};

/**
 * Returns a random integer between a minimum and maximum
 *
 * @param {Number} min
 * @param {Number} max
 */
exports.getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Returns a timestamp such as `3:10`, `45:32` or `132:44:19` from a given amount of seconds
 *
 * @param {Number} time Seconds
 */
exports.getTimeFromSeconds = (time) => {
	let hrs = ~~(time / 3600);
	let mins = ~~((time % 3600) / 60);
	let secs = ~~time % 60;
	let ret = "";

	if (hrs > 0) {
		ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}

	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;
	return ret;
};

/**
 * Encodes a URL
 *
 * @param {String} str URL to encode
 */
exports.encodeForUrl = (str) => {
	str = str
		.replaceAll("+", "%2B")
		.replaceAll("%", "%25")
		.replaceAll("&", "%26")
		.replaceAll(",", "%2C");
	return str;
};

/**
 * Moves an element in an array to the specified index
 *
 * @param {Array} arr
 * @param {Number} oldIndex
 * @param {Number} newIndex
 */
exports.arrayMove = (arr, oldIndex, newIndex) => {
	if (newIndex >= arr.length) {
		var k = newIndex - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}
	arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
	return arr;
};

/**
 * Removes an element from an array and returns it
 *
 * @param {Array} arr
 * @param {Number} index
 */
exports.arrayRemove = (arr, index) => {
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

/**
 * Calculates time in seconds for all the tracks in the queue to finish and returns it
 *
 * @param {Object} c MusicPlayer Connection object
 */
exports.getQueueTime = (c) => {
	if (!c) return 0;
	const queue = c.queue;
	let time;
	if (c.currentlyPlaying != null && c.audioResource != null) {
		time = c.currentlyPlaying.duration - c.audioResource.playbackDuration / 1000;
	} else {
		time = 0;
	}

	if (queue.length == 0) {
		return 0;
	} else {
		queue.forEach((e) => {
			time = time + e.duration;
		});
		return time - queue[0].duration;
	}
};

/**
 * Replaces some characters in a string so it is usable in a Discord embed
 *
 * @param {String} str
 */
exports.stringForEmbeds = (str) => {
	return str.replace(/[[]/g, "(").replace(/]/g, ")");
};

/**
 * Returns a given string that has been truncated to the given length
 *
 * @param {String} string
 * @param {Number} length
 */
exports.truncateString = (string, length) => {
	if (string == null) {
		console.warn("truncate() // String is null!");
		return "`INTERNALERR_STRING_EMPTY`";
	}
	if (string.length < length) {
		return this.stringForEmbeds(string);
	} else {
		return this.stringForEmbeds(string.substr(0, length) + "...");
	}
};

/**
 * Maps a given number from the given range to the given range
 *
 * @param {Number} value Value to map
 * @param {Number} low1 Previous range low
 * @param {Number} high1 Previous range high
 * @param {Number} low2 New range low
 * @param {Number} high2 New range high
 */
exports.map = (value, low1, high1, low2, high2) => {
	return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

/**
 * Returns bytes converted into format
 *
 * @param {Number} bytes
 * @param {Number=} decimals
 */
exports.formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Returns a number with commas
 *
 * @param {Number} x
 */
exports.numberWithCommas = (x) => {
	if (x == null) return null;
	return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Return string containing total bot uptime
 * @example
 * `2 days, 5 hours, 39 minutes and 2 seconds`
 *
 * @param {discord.Client} client Discord bot client
 */
exports.getClientUptime = (client) => {
	let totalSeconds = client.uptime / 1000;
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	return `${days} day${
		days > 1 ? "s" : ""
	}, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
};

/**
 * Returns the given string with the first character capitalized
 *
 * @param {String} str
 */
exports.capitalizeFirstLetter = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
