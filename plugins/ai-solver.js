import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        if (!text) return m.reply(`*• Ejemplo:* ${usedPrefix + command} Puedes resolver este problema matemático`) 
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw m.reply('𖣐 Responde a una *Imagen*.')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadPomf(media)
//        m.reply(url);

    const data = await fetch(`https://widipe.com/bardimg?url=${url}&text=${encodeURIComponent(text)}`)
    const aimsg = data.result;
    m.reply(`${aimsg}`)
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.help = ['solver']
handler.tags = ['ai']
handler.command = /^(solver)$/i

handler.register = true
handler.limit = 3

export default handler
