import bot from '../lib/engine.js';

export default async function (callbackQuery, ctx) {
  try {
    await bot.handleCallbackQuery(callbackQuery);
  } catch (error) {
    console.error('Error handling callback_query update:', error);
  }
}
