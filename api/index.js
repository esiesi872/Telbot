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
🔢 محاسبات:

${a} + ${b} = ${sum}
میانگین = ${avg}
${a} × ${b} = ${mul}
${a} ÷ ${b} = ${div}
    `.trim());
  } else {
    await ctx.reply('❌ لطفاً دو عدد وارد کن.\nمثال: 15 3');
  }
});

// برای Vercel (Node.js runtime)
export default async function handler(req) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      await bot.handleUpdate(body);
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Error', { status: 500 });
    }
  }
  return new Response('OK', { status: 200 });
}
