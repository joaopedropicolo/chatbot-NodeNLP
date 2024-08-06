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

    const bott = new TelegramBot('7331736184:AAH5KO-X0DrTT0f3APAkgSR01bKo4HLhs_k', { polling: true });

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

            const responseMessages = [
                "Aqui está a resposta que você pediu: 📝",
                "Esta é a informação que você solicitou: 📚",
                "Encontrei a resposta para você: 🔍",
                "Aqui está o que você queria saber: 💡",
                "Sua resposta é a seguinte: ✅"
            ];

            const responseMessage = responseMessages[Math.floor(Math.random() * responseMessages.length)];
            bott.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });
            const reply = response.answer;
            await bott.sendMessage(chatId, reply, { parse_mode: 'HTML' });
        }
    });
})();