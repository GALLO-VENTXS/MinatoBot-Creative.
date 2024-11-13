var handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`𖣐 ${conn.getName(m.sender)} Ahora está AFK${text ? ': ' + text : ''}`)
  }
  handler.help = ['afk <razón>']
  handler.tags = ['main']
  handler.command = /^afk$/i
  
  export default handler