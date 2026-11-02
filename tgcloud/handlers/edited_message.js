import bot from '../lib/engine.js';

export default async function (editedMessage, ctx) {
  try {
    await bot.handleEditedMessage(editedMessage);
  } catch (error) {
    console.error('Error handling edited_message update:', error);
  }
}
