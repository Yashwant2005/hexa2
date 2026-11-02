import bot from '../lib/engine.js';

export default async function (message, ctx) {
  try {
    await bot.handleMessage(message);
  } catch (error) {
    console.error('Error handling message update:', error);
  }
}
