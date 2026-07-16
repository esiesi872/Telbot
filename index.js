import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  await ctx.reply(`✅ ربات با موفقیت لود شد!

سلام! 👋
دو عدد رو به این شکل بفرست:
مثال: 12 5

من جمع، میانگین، ضرب و تقسیم را محاسبه می‌کنم.`);
});

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();
  const numbers = text.split(/\s+/).map(n => parseFloat(n));
  
  if (numbers.length === 2 && !isNaN(numbers[0]) && !isNaN(numbers[1])) {
    const [a, b] = numbers;
    
    const sum = a + b;
    const avg = (a + b) / 2;
    const mul = a * b;
    let div = b !== 0 ? (a / b).toFixed(4) : '⚠️ تقسیم بر صفر ممکن نیست!';
    
    const result = `
🔢 محاسبات برای ${a} و ${b}:

➕ جمع: ${sum}
📊 میانگین: ${avg}
✖️ ضرب: ${mul}
➗ تقسیم: ${div}
    `.trim();
    
    await ctx.reply(result);
  } else {
    await ctx.reply('❌ لطفاً دو عدد وارد کن.\nمثال: 15 3');
  }
});

// برای Vercel
export default webhookCallback(bot, 'express');

console.log('✅ ربات آماده دریافت پیام است');
