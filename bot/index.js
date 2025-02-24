import express from "express";
import { Client, Events, GatewayIntentBits } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Keep-alive route
app.get("/", (req, res) => res.send("Bot is running!"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  await message.reply("HI! from bot");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
      return;
  }

  if (interaction.commandName === 'short-url') {
      const url = interaction.options.getString('url');
      console.log(url) 
      await interaction.deferReply()

      try {
          const response = await axios.post('https://discord-bot-55kw.onrender.com/shorten', { originalUrl: url });
          await interaction.editReply(`Your Short URL: ${response.data.shortUrl}`);  
      } catch (error) {
          await interaction.editReply('Failed to generate Short URL');  
      }
  }
});

client.login(process.env.DISCORD_TOKEN);
