# supress-discordsrv-update-notifs

are you ~~normal~~ ~~strange~~ ~~normal~~ something like me and have your DiscordSRV console channel unmuted, and actively look through it, *and* are constantly annoyed at the repetitive update notifications? ~~go update bruh~~ Then this bot is for you! It will scan for messages, optionally with a channel/user whitelist, and delete them if they are similar enough to DiscordSRV update messages. Unlike regular bots, this one is designed to be self hosted, possibly alongside your discord server and can connect to the same account using the same token as your DiscordSRV bot account.

## what this does

1. receive a message
2. applies channel and user whitelists, if they are set. If not, itll still process this message
3. applies a few regular expressions on the message, looking for messages that might be an update message
4. deletes it!

## how to run

prerequisites: `node v14.x, pnpm 6.x`, `npm` will likely work but I'm not guaranteeing it.

1. `git clone https://github.com/autumnblazey/supress-discordsrv-update-notifs.git supressor && cd supressor`
2. `pnpm i && pnpm run build`
3. set env variables somehow (see [env variables section](#environment-variables))
4. `node supressor.mjs` to run it

## environment variables

These environment variables are used to configure the bot. This bot includes [dotenv](https://www.npmjs.com/package/dotenv) and will attempt to read from `.env` files.

- `TOKEN` (required) use this to set a bot token. You can provide multiple tokens as a comma seperated list of tokens. this will login to multiple accounts at the same time. Set them all in the same variable, comma seperated like: `xxxxxxxxxxxx.xxxxxx.xxxxxxxxx,xxxxxxxxxxxx.xxxxxx.xxxxxxxxx`
- `CHANNEL_WHITELIST` (optional) comma seperated list of channel IDs. if present, the bot will only delete messages sent in these channels
- `USER_WHITELIST` (optional) comma seperated list of user IDs. if present, the bot will only delete messages sent from these accounts.

## losing information?

nah, the actual log files on your server are still kept around, so you can manually review that if you need. Also, this bot will log the messages it deletes, as well as the author, channel, and content of the message to stdout for you if you need it.

## should you?

probably not, just update, problem solved. lol

## license

[AGPL v3.0 only](LICENSE)
