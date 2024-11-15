async function handler(m, { command, usedPrefix }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.reply(m.chat, `_no hay chats anónimos ahora_\nPara empezar a buscar uno, escriba ${usedPrefix}start`, m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.reply(other, `_no hay chats anónimos ahora_\nPara empezar a buscar uno, escriba ${usedPrefix}start`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, `_Kamu masih berada di dalam anonymous chat, menunggu partner_\nUntuk Berhenti Mencari Partner Ketik ${usedPrefix}leave`, m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.reply(room.a, `_no hay chats anónimos ahora_\nPara empezar a buscar uno, escriba ${usedPrefix}next`, m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.reply(room.a, `_no hay chats anónimos ahora_\nPara empezar a buscar uno, escriba ${usedPrefix}next`, m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.reply(m.chat, `_Buscando chats..._\nPara detener esta acción escribe ${usedPrefix}leave`, m)
            }
            break
        }
    }
}

handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler