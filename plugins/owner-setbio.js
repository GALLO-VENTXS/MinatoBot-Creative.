let handler = async (m, { conn, text }) => {
  if (!text) throw m.reply(`𖣐 Ingresa el texto luego del comando`)
    try {
   await conn.updateProfileStatus(text).catch(_ => _)
   conn.reply(m.chat, '𖣐 Se cambió con éxito la foto', m)
} catch {
      throw m.reply('Error.. :D')
    }
}
handler.help = ['setbio']
handler.tags = ['owner']
handler.command = /^(setbio)$/i
handler.owner = true

export default handler