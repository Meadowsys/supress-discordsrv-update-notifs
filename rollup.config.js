import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import node from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import fs from "fs";
import fsp from "fs/promises";
import { rollup } from "rollup";
import license from "rollup-plugin-license";
import notify from "rollup-plugin-notify";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-typescript2";

const production = process.env.NODE_ENV === "production";
const version = JSON.parse(fs.readFileSync("./package.json").toString()).version;

/** @type {import("rollup").RollupOptions} */
const config = {
   input: "./src/index.ts",
   output: {
      file: "./supressor.mjs",
      format: "es",
      compact: production,
      sourcemap: true,
      inlineDynamicImports: true
   },
   watch: { clearScreen: false },
   external: ["discord.js"],
   plugins: [
      // resolve node imports
      node(),

      // resolve json module
      json(),

      // allow importing of commonjs modules
      cjs(),

      // typescript support
      ts(),

      // some constants
      replace({
         preventAssignment: true,
         "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development"),
         "__VERSION__": JSON.stringify(version)
      }),

      // will not need these dotenv env variables in production
      production && replace({
         preventAssignment: true,
         "process.env.DOTENV_CONFIG_ENCODING": JSON.stringify(null),
         "process.env.DOTENV_CONFIG_PATH": JSON.stringify(null),
         "process.env.DOTENV_CONFIG_DEBUG": JSON.stringify(null),
      }),

      // squeeze for production
      production && terser({
         ecma: 2020,
         compress: {
            passes: 3
         },
         mangle: {
            toplevel: true
         }
      }),

      // append license header in production
      production && license({
         sourcemap: true,
         banner: {
            content: `
               supress-discordsrv-update-notifs (v${version}): bot that automatically deletes
               DiscordSRV update notifications sent to your console channel in Discord
               Copyright (c) 2021 Autumn (autumnblazey)

               This program is free software: you can redistribute it and/or modify
               it under the terms of the GNU Affero General Public License as
               published by the Free Software Foundation, version 3 only.

               This program is distributed in the hope that it will be useful,
               but WITHOUT ANY WARRANTY; without even the implied warranty of
               MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
               GNU Affero General Public License for more details.

               You should have received a copy of the GNU Affero General Public License
               along with this program.  If not, see <https://www.gnu.org/licenses/>.
            `
               .trim()
               .replace("\r\n", "\n")
               .split("\n")
               .map(s => s.trimStart())
               .join("\n"),

            commentStyle: "ignored"
         }
      }),

      // build notifications in dev mode
      !production && notify({ success: true })
   ]
};

export default config;

// production build
if (process.env.RUN_AS_BUILD_SCRIPT) (async () => {
   const bundle = await rollup(config);
   const { output } = await bundle.generate(config.output);
   if (output.length === 1 && output[0].type === "chunk") {
      // good! we should only get one chunk
      let code = output[0].code;
      if (output[0].map) code = code + `\n//#sourceMappingURL=${output[0].map.toUrl()}`;
      await fsp.writeFile(output[0].fileName, code);
      const oldmapper = config.input + ".map"
      if (fs.existsSync(oldmapper)) fsp.rm(oldmapper);
   } else console.log(`hrm... output.length === ${output.length}, output[0].type === ${output[0].type}`);
})();
