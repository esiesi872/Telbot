import { Bot } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE');

bot.command('start', (ctx) => {
  ctx.reply('سلام! دو عدد رو به صورت "عدد1 عدد2" بفرست، مثلاً: 10 5');
});

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();
  const numbers = text.split(/\s+/).map(n => parseFloat(n));
  
  if (numbers.length === 2 && !isNaN(numbers[0]) && !isNaN(numbers[1])) {
    const [a, b] = numbers;
    
    const sum = a + b;
    const avg = (a + b) / 2;
    const mul = a * b;
    let div = b !== 0 ? (a / b).toFixed(4) : 'تقسیم بر صفر ممکن نیست!';
    
    const result = `
🔢 محاسبات برای ${a} و ${b}:

➕ جمع: ${sum}
📊 میانگین: ${avg}
✖️ ضرب: ${mul}
➗ تقسیم: ${div}
    `.trim();
    
    await ctx.reply(result);
  } else {
    await ctx.reply('لطفاً دو عدد وارد کن، مثلاً: 12 4');
  }
});

bot.start();
console.log('ربات شروع شد!');
