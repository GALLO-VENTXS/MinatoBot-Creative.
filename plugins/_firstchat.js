import moment from 'moment-timezone';

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let user = global.db.data.users[m.sender]

    if (new Date() - user.pc < 86400000) return // waktu ori 21600000 (6 jam)
    await m.reply(`📮Nota: no envíe spam al bot
⏩Escribe *.menu* para mostrar el menú

📝¿Quieres tener eris ilimitados?
Habla con mi owner y obtendrás acceso *Premium*

Escriba *.owner* para obtener información más completa
`)
    user.pc = new Date * 1
}


function ucapan() {
    const time = moment.tz('America/Buenos_Aires').format('HH')
    let res = "¿Aún despiertx?, Duerme mejor. 🌙"
    if (time >= 5) {
        res = "Buena Madrugada 🌄"
    }
    if (time > 10) {
        res = "Buenos días ☀️"
    }
    if (time >= 12) {
        res = "Buenas Tardes 🌅"
    }
    if (time >= 19) {
        res = "Buenas Noches 🌙"
    }
    return res
}