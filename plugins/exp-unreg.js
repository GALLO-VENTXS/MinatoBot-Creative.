import { createHash } from 'crypto'
let handler = async function (m, { args }) {
  if (!args[0]) throw m.reply('*⚡ Ingresa tu número de série.*');
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw m.reply('✧ Este no es tu número de série')
  user.registered = false
  m.reply('```𖣐 Ya no está registradx!```')
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <SN>')
handler.tags = ['xp']

handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler