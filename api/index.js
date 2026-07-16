import { Bot } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  await ctx.reply(`✅ ربات با موفقیت کار می‌کند!

سلام! 👋
دو عدد بفرست مثل: 12 5`);
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
    
    await ctx.reply(`
🔢 محاسبات برای ${a} و ${b}:

➕ جمع: ${sum}
📊 میانگین: ${avg}
✖️ ضرب: ${mul}
➗ تقسیم: ${div}
    `.trim());
  } else {
    await ctx.reply('❌ دو عدد وارد کن.\nمثال: 15 3');
  }
});

// Handler استاندارد Vercel
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      await bot.handleUpdate(body);
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error');
    }
  } else {
    res.status(200).send('OK');
  }
}
