import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, generateWAMessageFromContent, }) => {
    let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw, statusupdate, autogetmsg, antivirus, publicjoin } = global.db.data.settings[conn.user.jid]
    const chats = Object.keys(await conn.chats)
    const groups = Object.keys(await conn.groupFetchAllParticipating())
    const block = await conn.fetchBlocklist()
       let tag = `@${m.sender.replace(/@.+/, '')}`
  let mentionedJid = [m.sender]
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let sts = `┌────〔 Estado 〕───⬣
│𖣐  Runtina ${uptime}
│𖣐  *${groups.length}* Grupos
│𖣐  *${chats.length - groups.length}* Pv's
│𖣐  *${Object.keys(global.db.data.users).length}* Usuarios
│𖣐  ${block == undefined ? '*0* Bloqueados' : '*' + block.length + '* Desbloqueados'}
│𖣐  *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chats Baneados
│𖣐  *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Usuarios Baneados
╰────────────⬣

┌───〔 Modos 〕───⬣
│𖣐  ${anon ? '✅' : '❌'} *Chat Anonimo*
│𖣐  ${anticall ? '✅' : '❌'} *Anti Llamar*
│𖣐  ${antispam ? '✅' : '❌'} *Anti Spam*
│𖣐  ${antitroli ? '✅' : '❌'} *Anti Bug Text*
│𖣐  ${backup ? '✅' : '❌'} *Auto Backup DB*
│𖣐  ${groupOnly ? '✅' : '❌'} *Modo Grupo*
│𖣐  ${jadibot ? '✅' : '❌'} *Serbot*
│𖣐  ${nsfw ? '✅' : '❌'} *Modo Nsfw*
╰────────────⬣`

m.reply(sts)

}

handler.help = ['botstat']
handler.tags = ['info']
handler.command = /^botstat?$/i

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}