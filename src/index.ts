import "source-map-support/register";
import "dotenv/config";
import { Client } from "discord.js";
import { getenv } from "./getenv";
import { updateMessages, warnings } from "./message-tests";

const env = getenv();
const events = ["SIGINT", "SIGTERM", "exit"];


env.tokens.forEach(async token => {
   const client = new Client();

   client.on("message", async msg => {
      // see comments in ./message-test.ts

      // return true if no match
      // return true if message is ok
      const tester = (r: RegExp) => msg.content.match(r) === null;

      if (!(updateMessages.every(tester) && warnings.every(tester))) {
         const logmsg = `deleting message, (channel ${msg.channel.id}) ${JSON.stringify(msg.content)}`;
         await msg.delete();
         console.log(logmsg);
      }
   });

   await client.login(token);

   const userinfo = `${client.user?.username}#${client.user?.discriminator} (id ${client.user?.id})`;
   console.log(`logged in! ${userinfo}`);

   let loggedin = true;
   events.forEach(e => process.on(e, () => {
      if (!loggedin) return;
      loggedin = false;

      client.destroy();
      console.log(`logged out! ${userinfo}`);
   }));
});
