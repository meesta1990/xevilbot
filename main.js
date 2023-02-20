import { Telegraf, Markup } from 'telegraf'
import express from 'express';

const expressApp = express();
const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
    res.send('Hello World!')
})
expressApp.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const TELEGRAM_BOT_TOKEN = '1812772248:AAFws2Ej6_bDKRbxguR0pQuCSpbkU2NVoFY';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

const line1 = ['aldo aldo', 'AmericaH', 'anitra', 'audio Sole 1', 'audio Sole 2'];
const line2 = ['back2back', 'fai vomitare', 'fate vomitare', 'Fetta di carne'];
const line3 = ['Futili tentativi','he bought dump it', 'infimad', 'Io sono stato'];
const line4 = ['lavoro da casa','LO SCHIFO', 'meesta versione definitiva dello schifo'];
const line5 = ['mooo','motorino', 'nooo', 'Novi', 'pa pa pa pa'];
const line6 = ['per piacere max','Pranzo xevil 2021', 'ragionamenti complessi', 'Rauuul'];
const line7 = ['schifoso cane maledetto','se tu avessi fatto sirus'];
const line8 = ['secondo me è una stronzata','tempo nefasto', 'ti sento agitato'];
const line9 = ['uno dei peggiori giocatori','Vaffanculo', 'vincerei sempre fate vomitare', 'SBORRO'];
const line10 = ['video filosofia', 'video muto 1', 'video muto 2'];
const line11 = ['video non voglio mentirti michele', 'video ubriachezza', 'video vinile'];
const line12 = ['video vita avara', 'video wow'];

const whitelist = [-1001204191448];

bot.command('/start', (ctx) =>{
    ctx.reply('XevilBot Started! Seleziona dalla chat il vocale del bot Priamo', Markup
		.keyboard([line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12])
		.oneTime()
		.resize()
	)

});

for(let i=0;i<line1.length;i++){
    bot.hears(line1[i], (ctx) => {
       ctx.replyWithAudio({ source: 'assets/media/audio/' + line1[i] +'.ogg' })
    });
}
for(let i=0;i<line2.length;i++){
    bot.hears(line2[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line2[i] +'.ogg' })
    });
}
for(let i=0;i<line3.length;i++){
    bot.hears(line3[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line3[i] +'.ogg' })
    });
}

for(let i=0;i<line4.length;i++){
    bot.hears(line4[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line4[i] +'.ogg' })
    });
}
for(let i=0;i<line5.length;i++){
    bot.hears(line5[i], (ctx) => {
		ctx.replyWithAudio({ source: 'assets/media/audio/' + line5[i] +'.ogg' })
    });
}
for(let i=0;i<line6.length;i++){
    bot.hears(line6[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line6[i] +'.ogg' })
    });
}

for(let i=0;i<line7.length;i++){
    bot.hears(line7[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line7[i] +'.ogg' })
    });
}
for(let i=0;i<line8.length;i++){
    bot.hears(line8[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line8[i] +'.ogg' })
    });
}
for(let i=0;i<line9.length;i++){
    bot.hears(line9[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line9[i] +'.ogg' })
    });
}
for(let i=0;i<line10.length;i++){
    bot.hears(line10[i], (ctx) => {
        ctx.replyWithAudio({ source: 'assets/media/audio/' + line10[i] +'.ogg' })
    });
}

//video
for(let i=0;i<line10.length;i++){
    bot.hears(line10[i], (ctx) => {
       const videoName = line10[i].toLowerCase().replace('video ','');
            ctx.replyWithVideoNote({ source: 'assets/media/video/' + videoName +'.mp4' })
    });
}
for(let i=0;i<line11.length;i++){
    bot.hears(line11[i], (ctx) => {
        const videoName = line11[i].toLowerCase().replace('video ','');
            ctx.replyWithVideoNote({ source: 'assets/media/video/' + videoName +'.mp4' })
    });
}
for(let i=0;i<line12.length;i++){
    bot.hears(line12[i], (ctx) => {
        const videoName = line12[i].toLowerCase().replace('video ','');
            ctx.replyWithVideoNote({ source: 'assets/media/video/' + videoName +'.mp4' })
    });
}

bot.catch((e)=>{
console.log(e);
})
bot.startPolling();
