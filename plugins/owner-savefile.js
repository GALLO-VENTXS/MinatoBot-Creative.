import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '*❃ Comando no disponible para subbots*', m )
}
if (!text) return m.reply(`𖣐 Ingresa la Ruta y el nombre del Archivo junto al comando.`)
try {
if (!m.quoted.text) return m.reply(`𖣐 Responder al mensaje.`)
let path = `${text}`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`✧ Guardado en *${path}*.`)
} catch {
await m.reply(`𖣐 Responder al mensaje.`)
}}
handler.command = ["savefile", "sf", "savecmd"]
handler.tags = ['owner']
handler.help = ['savefile']
handler.rowner = true
export default handler