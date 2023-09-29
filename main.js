import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs'

// Token del tuo bot (inseriscilo qui)
const TOKEN = '1812772248:AAFws2Ej6_bDKRbxguR0pQuCSpbkU2NVoFY';



// Inizializza il bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Directory contenente i file audio
const audioDir = './assets/media/audio/';
const videoDir = './assets/media/video/';

// Funzione per creare il menu di contesto con pulsanti inline
function createContextMenu(chatId, messageId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Riproduci Audio', callback_data: 'audio' },
          { text: 'Guarda Video', callback_data: 'video' },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, 'Scegli un\'azione:', options);
}

// Funzione per inviare la lista degli audio disponibili con pulsanti inline
function sendFileList(chatId, extension) {
  const isAudio = extension === '.ogg';
  const audioFiles = fs.readdirSync(isAudio ? audioDir : videoDir).filter((file) => file.endsWith(extension));

  if (audioFiles.length === 0) {
    bot.sendMessage(chatId, `Nessun file ${extension} disponibile`);
  } else {
    const type = isAudio ? 'audio' : 'video';
    const keyboard = audioFiles.map((fileName) => [
      {
        text: fileName,
        callback_data: `${type}_${fileName}`,
      },
    ]);

    const options = {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    };

    bot.sendMessage(chatId, `Seleziona un file ${type}`, options);
  }
}

// Gestisci i messaggi ricevuti
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Invia il menu di contesto se il messaggio è una stringa valida
  if ("/start xevilbot") {
    createContextMenu(chatId, msg.message_id);
  }
});

// Gestisci le callback query (azioni dal menu di contesto)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const callbackData = query.data;

  if (callbackData === 'audio') {
    // Se è stato premuto il pulsante "Audio", invia la lista degli audio disponibili
    sendFileList(chatId, '.ogg');
  } else if (callbackData === 'video') {
    // Se è stato premuto il pulsante "Video", invia la lista degli audio disponibili
    sendFileList(chatId, '.mp4')
  } else if (callbackData.startsWith('audio_') || callbackData.startsWith('video_')) {
    const type = callbackData.substring(0, 5)
    const isAudio = type === 'audio';
    // Se è stata selezionata una traccia , estrai il nome del file
    const fileName = callbackData.replace(type + '_', '');

    // Costruisci il percorso completo del file
    const filePath = `${isAudio ? audioDir : videoDir}${fileName}`;

    // Invia l'audio o il video
    if (fs.existsSync(filePath)) {
      if (isAudio) bot.sendAudio(chatId, filePath);
      else bot.sendVideo(chatId, filePath);
    } else {
      bot.sendMessage(chatId, 'Il file richiesto non esiste.');
    }
  }

  // Rimuovi il menu di contesto dopo l'azione
  bot.deleteMessage(chatId, messageId);
});

// Avvia il bot
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log('Bot avviato');