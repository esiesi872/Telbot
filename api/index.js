import { Bot } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  await ctx.reply(`✅ ربات آنلاین است!

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

// Handler مخصوص Vercel
export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
