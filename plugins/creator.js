import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `𖣐 Developer Bot `, `No famoso`, `galloventas.20@gmail.com`, `🇨🇴 Colombia`, `📍 https://github.com/GALLO-VENTXS`, `⚡ Owner Minato Creative`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `✧ Whatsapp Bot`, `𖣐 No hagas spam.`, `galloventas.20@gmail.com`, `🇲🇽 México`, `📍 https://github.com/GALLO-VENTXS/MinatoBot-Creative`, `Si hay un error habla con mi owner ☺`]
  ], fkontak)
  await m.reply(`Hola @${m.sender.split(`@`)[0]} solo habla con mi Owner por temas del bot.`)
  } 

handler.help = ['owner', 'creador']
handler.tags = ['main', 'info']
handler.command = /^(owner|creador)/i
export default handler