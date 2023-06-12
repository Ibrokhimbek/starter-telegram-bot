const { Grammy } = require('grammy');

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
