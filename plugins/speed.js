import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import { sizeFormatter } from 'human-readable'
import { join } from 'path'
import { promises } from 'fs'
import moment from 'moment-timezone'

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, __dirname, text, command }) => {
  let date = moment.tz('America/Buenos_Aires').format("dddd, Do MMMM, YYYY")
  let time = moment.tz('America/Buenos_Aires').format('HH:mm:ss')
  let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  
  // Hanya menggunakan satu core CPU
  const cpu = _cpus()[0];
  
  let start = process.hrtime();
  let speed;
  let end;
  let cpuUsage;
  
  // Mengukur waktu yang dibutuhkan untuk melakukan pengukuran
  end = process.hrtime(start);
  speed = Math.round((end[0] * 1000 + end[1] / 1000000));
  
  // Menghitung persentase penggunaan CPU
  cpuUsage = ((cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq) / cpu.times.idle) * 100;
  
  let capti = `*⚡ Nombre*: ${_package.name} ⚡
𖣐 *Versión*: ${_package.version}
𖣐 *Librería*: ${_package.description}

𖣐 *Runtina*:\n ${uptime}
𖣐 *Database*: ${totalreg}

𖣐 *Fecha*: ${date}
𖣐 *Hora*: ${time}

*𖣐 INFO SERVER :*
𖣐 *Ping*: ${speed} MS
𖣐 *Hostname*: ${os.hostname()} (TK HOSTING)
𖣐 *Plataforma:* ${os.platform()}
𖣐 *Ram*: ${format(totalmem() - freemem())} / ${format(totalmem())}

*𖣐 Estado :*
𖣐 ${groupsIn.length} - Chats Grupales
𖣐 ${groupsIn.length} - Grupos Unidos
𖣐 ${groupsIn.length - groupsIn.length} - Grupos Salidos
𖣐 ${chats.length - groupsIn.length} - Pv's
𖣐 ${chats.length} - Total Chats

*Memoria NodeJS Usada*
${'```' +
    Object.keys(used)
      .map(
        (key, _, arr) =>
          `${key.padEnd(Math.max(...arr.map((v) => v.length)), ' ')}: ${format(
            used[key]
          )}`
      )
      .join('\n') +
    '```'
    }
    
*CPU Usado*
${cpu.model.trim()} (${cpu.speed} MHZ)\n*Usage*: ${cpuUsage.toFixed(2)}%
`.trim()

  m.reply(capti)

}

handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']

handler.command = /^(ping|speed|info)$/i
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Día(s) ☀️*\n ', h, ' *Hora(s) 🕐*\n ', m, ' *Minuto(s) ⏰*\n ', s, ' *Segundo(s) ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
