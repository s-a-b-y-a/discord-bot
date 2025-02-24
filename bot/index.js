import { Client, Events, GatewayIntentBits } from "discord.js";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config()
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.MessageCreate, async (message) => {
    if(message.author.bot) return

    await message.reply('HI! from bot')
});

client.on(Events.InteractionCreate, async (interaction) => {
    if(!interaction.isCommand()) return
    if(interaction.commandName === 'ping'){
      await interaction.reply('Pong!')
    }
    
    if(interaction.commandName === 'short-url'){
      const url = interaction.options.getString('url')
      try {
        const response = await axios.post('http://localhost:5000/shorten', { originalUrl: url })
        await interaction.reply(`Your Short URL: ${response.data.shortUrl}`)
      } catch (error) {
        await interaction.reply('Failed to generate ShortURL')
      }
    }
})

client.login(
  process.env.DISCORD_TOKEN
);
