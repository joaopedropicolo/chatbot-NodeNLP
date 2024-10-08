const { NlpManager } = require('node-nlp');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const strings = JSON.parse(fs.readFileSync('strings.json', 'utf8'));
const answers = JSON.parse(fs.readFileSync('answers.json', 'utf8'));

const manager = new NlpManager({ languages: ['pt'] });


Object.entries(strings).forEach(([key, value]) => {
    manager.addDocument('pt', key, value);
});

Object.entries(answers).forEach(([key, value]) => {
    manager.addAnswer('pt', key, value);
});

(async () => {
    await manager.train();
    manager.save();

    const bott = new TelegramBot('6782553841:AAGIBnF0xW-z48isb9Lsq_cPp4m4-UFRuL4', { polling: true });

    bott.onText(/\/echo (.+)/, (msg, match) => bott.sendMessage(msg.chat.id, match[1]));

    bott.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const response = await manager.process('pt', msg.text.toLowerCase());
        if(response.answer == null){

            const errorMessages = [
                "Desculpe, não entendi sua mensagem. 🤔",
                "Parece que não consegui compreender o que você disse. 🤔",
                "Essa mensagem está um pouco confusa para mim. 😕",
                "Não consegui entender sua mensagem. Pode reformular? 🤔",
                "Ops, não consegui captar sua mensagem. 😕",
                "Hmm, não consegui entender o que você quis dizer. 😕",
                "Desculpe, estou tendo dificuldades para entender sua mensagem. 🤔",
                "Poderia explicar de outra forma? 🤔",
                "Infelizmente, não consegui entender isso. 😕",
                "Pode tentar perguntar de outra maneira? 🤔"
            ];
            const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            bott.sendMessage(chatId, errorMessage, { parse_mode: 'HTML' }); 
            
        } else {

            const reply = response.answer;
            
            if (response.intent == 'cumprimentos.ola') {

                const helloMessages = [
                    "Tente me perguntar sobre como doar sangue! 🩸",
                    "Que tal me perguntar com que idade pode se doar sangue? 💡",
                    "Quer saber sobre a doação de sangue? Sinta-se a vontade para me perguntar sobre! 😉",
                    "Tente me perguntar com que peso pode-se doar! 📚",
                    "Não se limite, pergunte-me sobre doação de sangue! 😀",
                    "Se interessou em saber mais sobre a importância da doação de sangue? Pergunte-me! ❤️",
                    "Vamos conversar sobre os mitos e verdades sobre doação de sangue! O que você gostaria de saber? 🧐",
                    "Quer saber mais sobre os requisitos para doar sangue? Estou aqui para ajudar! 💡",
                    "Você sabia que doar sangue pode salvar vidas? Pergunte como você pode ajudar! 🌍",
                    "Está pensando em doar sangue? Pergunte-me como você pode começar! 🌟"
                ];
                
            await bott.sendMessage(chatId, reply, { parse_mode: 'HTML' }); 
            const helloMessage = helloMessages[Math.floor(Math.random() * helloMessages.length)];
            bott.sendMessage(chatId, helloMessage, { parse_mode: 'HTML' });

            } else {

            const responseMessages = [
                "Com o que mais posso ajudar? 🤔",
                "Há mais alguma dúvida que eu possa esclarecer? 📚",
                "Precisa de mais alguma coisa? 😊",
                "Posso te ajudar com mais alguma informação? 💡",
                "Algo mais em que eu possa ser útil? 👍",
                "Tem mais alguma dúvida? 😀",
                "Posso ajudar com mais alguma coisa? 😉"
            ];

            await bott.sendMessage(chatId, reply, { parse_mode: 'HTML' }); 
            const responseMessage = responseMessages[Math.floor(Math.random() * responseMessages.length)];
            bott.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });
            }
        }
    });
})();