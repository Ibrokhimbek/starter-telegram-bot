import { Bot, InlineKeyboard, webhookCallback } from "grammy";
import { chunk } from "lodash";
import express from "express";
import { applyTextEffect, Variant } from "./textEffects";
import { Grammy } from 'grammy'

// Replace 'YOUR_API_TOKEN' with your actual API token
const bot = new Grammy(process.env.api_bot);

bot.on('message', (ctx) => {
  if (ctx.message.new_chat_members) {
    const chatId = ctx.chat.id;
    const newMembers = ctx.message.new_chat_members;

    newMembers.forEach((newMember) => {
      console.log(newMember);
      const firstName = newMember.first_name;
      const greeting = `Assalomu alaykum hurmatli ${firstName}!\n\nSizga aloqaga chiqishimiz uchun ismingiz va telefon raqamingizni yozib qoldiring!`;
      if (firstName !== 'Coredu learning') {
        ctx.reply(greeting, { reply_to_message_id: ctx.message.message_id });
      }
    });
  }
});

bot.start();

console.log('Bot is running...');


// Start the server
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}
