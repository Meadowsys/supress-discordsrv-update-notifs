export function getenv() {
   function die(envvar: string): never {
      console.error(`fatal error: env var ${envvar} not found! required to run!`);
      process.exit(1);
   }

   if (!process.env.TOKEN) die("TOKEN");
   // if (!process.env.)

   return {
      // multiple bots to log in as
      tokens: process.env.TOKEN.split(",").map(s => s.trim())
   }
}
