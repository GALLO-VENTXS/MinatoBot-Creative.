import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un link de YouTube\n*⚡ Ejemplo:* ${usedPrefix}${command} https://youtu.be/oGmW2CF001I`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${text}`)
  let dp = await d2.json()
  m.reply(`_✧ Enviando ${dp.result.title} (${dp.result.duration})_\n\n> ${text}`)
    
const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}
    let videop = await getBuffer(dp.result.media.mp4)
//	await conn.sendFile(m.chat, videop, `${title}.mp4`, `\`❃ Pedido terminado\``, m)
	await conn.sendMessage(m.chat, { document: videop, caption: `\`❃ Pedido terminado\``, mimetype: 'video/mp4', fileName: `${dp.result.title}` + `.mp4`}, {quoted: m })
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['ytmp4doc']
handler.tags = ['downloader']
handler.command = /^(ytmp4doc|ytvdoc)$/i
handler.premium = false
handler.register = true
export default handler