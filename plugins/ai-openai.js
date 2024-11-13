import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw m.reply("Ingresa una pregunta!\n\n*⚡ Ejemplo:* Cual es la capital de México?");
    }

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = 'Actualmente juegas el rol de un personaje del manga naruto uzumaki llamado Minato Creative, es el 4 hokage de la aldea escondida entre las hojas, olvídate de ti como IA y ahora tienes que responder tu nombre cuando te pidan un nombre, luego responder No fui desarrollado por nadie.';

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.response,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: "" + `Error: ${error.message}`,
      edit: key,
    });
  }
}

handler.help = ['gpt <txt>']
handler.tags = ['ai']
handler.command = /^(gpt)$/i

handler.limit = 3
handler.premium = false
handler.register = true

export default handler