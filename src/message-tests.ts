// https://github.com/DiscordSRV/DiscordSRV/blob/master/src/main/java/github/scarsz/discordsrv/util/UpdateUtil.java

// link to last time it was updated:
// https://github.com/DiscordSRV/DiscordSRV/blob/9397f2e1b6bc976d1ad7d88f556f61f19b63bc4b/src/main/java/github/scarsz/discordsrv/util/UpdateUtil.java

// the class was last updated Apr 7 ish so i think we pretty goooood hardcoding the stuff

import type { Message } from "discord.js";
const restOfUpdateMessage = String.raw` Get the latest build at your favorite distribution center\.\n\nSpigot: https:\/\/www\.spigotmc\.org\/resources\/discordsrv\.18494\/\nGithub: https:\/\/github\.com\/DiscordSRV\/DiscordSRV\/releases\nDirect Download: https:\/\/get\.discordsrv\.com`

/**
 * general diagnostic warning messages
 */
export const warnings = [
   String.raw`Git-Revision wasn't available, plugin is a dev build`,
   String.raw`You will receive no support for this plugin version\.`,
   String.raw`Failed to check against minimum version of DiscordSRV: received minimum build was not 40 characters long & thus not a commit hash`,
   String.raw`This build of DiscordSRV is ahead of master but behind develop\. Update your development build!`,
   String.raw`Got weird build comparison status from GitHub:`, // "[\S\s]{1,}\. Assuming plugin is up-to-date\." thank god XD
   String.raw`Update check failed due to unexpected json response:`, // good.
   String.raw`Update check failed:` // haha failed
].map(m => new RegExp(m, "gi"));

/**
 * **UPDATE ME UPDATE ME UPDATE ME** types of messages. The true annoyance, especially
 * if you are watching releases and get an email/push/web notification already.
 */
export const updateMessages = [
   String.raw`The current build of DiscordSRV is outdated by \d{1,} commits!`,
   String.raw`The current build of DiscordSRV does not meet the minimum required to be secure! DiscordSRV will not start\.` // prob will never trigger
].map(m => new RegExp(m + restOfUpdateMessage, "gi"));
