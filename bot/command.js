import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import dotenv from "dotenv"

dotenv.config()
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "short-url",
    description: "Returns a short url",
    options: [
      {
        name: "url",
        type: ApplicationCommandOptionType.String,
        description: "The url to shorten",
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID,'1343209691223687238'), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
