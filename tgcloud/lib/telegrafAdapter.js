import { api } from 'sdk';

export class TelegrafAdapter {
  constructor() {
    this.commands = new Map();
    this.actions = [];
    this.messageHandlers = [];
    this.textHandlers = [];
    this.callbackQueryMiddlewares = [];
    this.editedMessageHandlers = [];
    this.middlewares = [];
    this.botInfo = {
      id: 6265981509,
      is_bot: true,
      first_name: 'PokePlay',
      username: 'PokePlayBot'
    };

    this.telegram = {
      sendMessage: async (chatId, text, extra = {}) => {
        return api.sendMessage({ chat_id: chatId, text, ...extra });
      },
      sendPhoto: async (chatId, photo, extra = {}) => {
        return api.sendPhoto({ chat_id: chatId, photo, ...extra });
      },
      editMessageText: async (chatId, messageId, inlineMessageId, text, extra = {}) => {
        const payload = { text, ...extra };
        if (inlineMessageId) {
          payload.inline_message_id = inlineMessageId;
        } else {
          payload.chat_id = chatId;
          payload.message_id = messageId;
        }
        return api.editMessageText(payload);
      },
      editMessageCaption: async (chatId, messageId, inlineMessageId, caption, extra = {}) => {
        const payload = { caption, ...extra };
        if (inlineMessageId) {
          payload.inline_message_id = inlineMessageId;
        } else {
          payload.chat_id = chatId;
          payload.message_id = messageId;
        }
        return api.editMessageCaption(payload);
      },
      editMessageReplyMarkup: async (chatId, messageId, inlineMessageId, replyMarkup) => {
        const payload = { reply_markup: replyMarkup };
        if (inlineMessageId) {
          payload.inline_message_id = inlineMessageId;
        } else {
          payload.chat_id = chatId;
          payload.message_id = messageId;
        }
        return api.editMessageReplyMarkup(payload);
      },
      editMessageMedia: async (chatId, messageId, inlineMessageId, media, extra = {}) => {
        const payload = { media, ...extra };
        if (inlineMessageId) {
          payload.inline_message_id = inlineMessageId;
        } else {
          payload.chat_id = chatId;
          payload.message_id = messageId;
        }
        return api.editMessageMedia(payload);
      },
      deleteMessage: async (chatId, messageId) => {
        return api.deleteMessage({ chat_id: chatId, message_id: messageId });
      },
      answerCbQuery: async (callbackQueryId, text, showAlert = false, extra = {}) => {
        return api.answerCallbackQuery({
          callback_query_id: callbackQueryId,
          text,
          show_alert: showAlert,
          ...extra
        });
      },
      setMyCommands: async (commands, extra = {}) => {
        return api.setMyCommands({ commands, ...extra });
      },
      forwardMessage: async (chatId, fromChatId, messageId) => {
        return api.forwardMessage({ chat_id: chatId, from_chat_id: fromChatId, message_id: messageId });
      }
    };
  }

  use(...fns) {
    this.middlewares.push(...fns);
    return this;
  }

  command(name, ...fns) {
    this.commands.set(name.toLowerCase(), fns);
    return this;
  }

  action(trigger, ...fns) {
    this.actions.push({ trigger, fns });
    return this;
  }

  on(updateType, ...fns) {
    if (updateType === 'message') {
      this.messageHandlers.push(...fns);
    } else if (updateType === 'text') {
      this.textHandlers.push(...fns);
    } else if (updateType === 'callback_query') {
      this.callbackQueryMiddlewares.push(...fns);
    } else if (updateType === 'edited_message') {
      this.editedMessageHandlers.push(...fns);
    }
    return this;
  }

  createContext(update, type) {
    const isCb = type === 'callback_query';
    const msg = isCb ? update.message : update;
    const from = update.from || (msg ? msg.from : null);
    const chat = update.chat || (msg ? msg.chat : null);

    const ctx = {
      update,
      type,
      from,
      chat,
      telegram: this.telegram,
      botInfo: this.botInfo,
      session: {},
      match: null,
      replyWithMarkdown: async (text, extra = {}) => {
        return api.sendMessage({
          chat_id: chat ? chat.id : from.id,
          text,
          parse_mode: 'Markdown',
          ...extra
        });
      },
      replyWithHTML: async (text, extra = {}) => {
        return api.sendMessage({
          chat_id: chat ? chat.id : from.id,
          text,
          parse_mode: 'HTML',
          ...extra
        });
      },
      replyWithPhoto: async (photo, extra = {}) => {
        return api.sendPhoto({
          chat_id: chat ? chat.id : from.id,
          photo,
          ...extra
        });
      },
      reply: async (text, extra = {}) => {
        return api.sendMessage({
          chat_id: chat ? chat.id : from.id,
          text,
          ...extra
        });
      },
      deleteMessage: async (messageId) => {
        const mId = messageId || (msg ? msg.message_id : null);
        const cId = chat ? chat.id : (from ? from.id : null);
        if (cId && mId) {
          try {
            return await api.deleteMessage({ chat_id: cId, message_id: mId });
          } catch (e) {
            return false;
          }
        }
      },
      answerCbQuery: async (text, showAlert = false) => {
        if (isCb && update.id) {
          try {
            return await api.answerCallbackQuery({
              callback_query_id: update.id,
              text: typeof text === 'string' ? text : undefined,
              show_alert: typeof showAlert === 'boolean' ? showAlert : false
            });
          } catch (e) {
            return false;
          }
        }
      }
    };

    if (isCb) {
      ctx.callbackQuery = update;
      ctx.message = update.message;
    } else {
      ctx.message = update;
    }

    return ctx;
  }

  async runPipeline(ctx, handlers) {
    let index = 0;
    const next = async () => {
      if (index < handlers.length) {
        const fn = handlers[index++];
        return await fn(ctx, next);
      }
    };
    return await next();
  }

  async handleMessage(message) {
    const ctx = this.createContext(message, 'message');
    const text = (message.text || message.caption || '').trim();

    if (text.startsWith('/')) {
      const parts = text.split(/\s+/);
      let cmd = parts[0].substring(1).toLowerCase();
      if (cmd.includes('@')) {
        cmd = cmd.split('@')[0];
      }
      if (this.commands.has(cmd)) {
        const fns = this.commands.get(cmd);
        return await this.runPipeline(ctx, fns);
      }
    }

    if (text && this.textHandlers.length > 0) {
      await this.runPipeline(ctx, this.textHandlers);
    }

    if (this.messageHandlers.length > 0) {
      await this.runPipeline(ctx, this.messageHandlers);
    }
  }

  async handleCallbackQuery(cbQuery) {
    const ctx = this.createContext(cbQuery, 'callback_query');
    const data = cbQuery.data || '';

    if (this.callbackQueryMiddlewares.length > 0) {
      await this.runPipeline(ctx, this.callbackQueryMiddlewares);
    }

    for (const action of this.actions) {
      let matched = false;
      if (typeof action.trigger === 'string' && action.trigger === data) {
        matched = true;
        ctx.match = [data];
      } else if (action.trigger instanceof RegExp) {
        const m = data.match(action.trigger);
        if (m) {
          matched = true;
          ctx.match = m;
        }
      }

      if (matched) {
        return await this.runPipeline(ctx, action.fns);
      }
    }
  }

  async handleEditedMessage(message) {
    const ctx = this.createContext(message, 'edited_message');
    if (this.editedMessageHandlers.length > 0) {
      await this.runPipeline(ctx, this.editedMessageHandlers);
    }
  }
}
