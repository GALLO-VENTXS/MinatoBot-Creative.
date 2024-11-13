let handler = m => m
handler.before = m => {
  let user = global.db.data.users[m.sender]
  if (user.afk > -1) {
    m.reply(`
𖣐 Ahora estas AFK${user.afkReason ? ' \n\n*Razón:*' + user.afkReason : ''}
*Durante:* ${(new Date - user.afk).toTimeString()}
`.trim())
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m.reply(`
    _*⚡ ¡No lo menciones!*_
Ahora está AFK ${reason ? '\nRazón ' + reason : ''}
*Durante:* ${(new Date - afkTime).toTimeString()}
`.trim())
  }
  return true
}

export default handler