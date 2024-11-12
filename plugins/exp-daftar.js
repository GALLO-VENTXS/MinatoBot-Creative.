import { createHash } from 'crypto'
const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
  } = (await import('@adiwajshing/baileys')).default

var link_img = `https://i.ibb.co/tzXBBX9/file.jpg`

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
    let nombre = conn.getName(m.sender)
    let bbbkeni = `.reg ${nombre}.18`
        let buttonMessage = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: { text: `✧ Formato incorrecto\n*${usedPrefix}reg Nombre.Edad*` },
                    nativeFlowMessage: {
                        buttons: [{
                      name: "quick_reply",
                      buttonParamsJson: "{\"display_text\":\"Registro Automatico\",\"id\":\""+bbbkeni+"\"}"
              },],
                    }
                })
            }
        }
    }, { quoted: global.ftoko });
  if (user.registered === true) throw m.reply(`✧ Usted ya esta registradx\nQuiere salir del registro? ${usedPrefix}unreg <NUMERO DE SERIE>`)
  if (!Reg.test(text)) throw conn.relayMessage(m.chat, buttonMessage.message, {});
//  if (!Reg.test(text)) throw m.reply(`𖣐 Formato incorrecto\n*${usedPrefix}reg Nombre.Edad*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw m.reply('𖣐 Solo puedes poner letras en tu nombre')
  if (!age) throw m.reply('𖣐 Solo puedes poner numeros en tu edad')
  age = parseInt(age)
  if (age > 120) throw m.reply('𖣐 Usted es demasiado viejo')
  if (age < 16) throw m.reply('𖣐 Usted es demasiado menor')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let txt_reg = `
`+"*`REGISTRO COMPLETO`*\n"+`

╭─「 Info 」
│ *𖣐 Nombre:* ${name}
│ *𖣐 Edad:* ${age} Años 
╰────
${readMore}
*𖣐 Numero de serie:*
${sn}

**Términos de servicio (TOS) - Mł₦λŦØ ₡ŘEλŦłVE**
Al utilizar Minato Creative ES, usted acepta los siguientes términos:

1. *ESTÁ ESTRICTAMENTE PROHIBIDO CAMBIAR EL TEMPORIZADOR/MENSAJE TEMPORAL*
El bot bloqueará automáticamente su número, para desbanear informe al propietario (+${global.nomorown}).

2. *NO ENVÍO DE MEDIOS NSFW*
El bot detectará automáticamente los medios y prohibirá su número, para desbabear, informe al propietario (+${global.nomorown}).

3. *EL SPAM DE NÚMEROS DE BOT ESTÁ PROHIBIDO*
El bot bloqueará permanentemente su número si hay una indicación de spam en su número.

4. *PROPIETARIO DEL CHAT SI ES NECESARIO*
No tiene sentido chatear con el número de bot, porque el número de bot se almacena en el servidor y el propietario no verá su chat.

Al utilizar Minato Creative, usted acepta todos los términos aplicables.

*Estos términos se actualizaron por última vez el 12 de mayo de 2024.*

Registrarse significa aceptar los términos
`
           let txt_body = txt_reg
            let txt_footer = wm
            let txt_title = `𖣐 MINATO CREATIVE THE BEST BOT WHATSAPP 𖣐`
            let txt_subtitle = ``
            let creador = `By GALLO-VENTXS (no borrar creditos)`
            let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: txt_body
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: txt_footer
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : { url: link_img }}, { upload: conn.waUploadToServer})), 
                  title: txt_title,
                  gifPlayback: false,
                  subtitle: txt_subtitle,
                  hasMediaAttachment: false  
                }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
             {                
  "name": "single_select",
"buttonParamsJson": 
`{
  "title": "𖣐 CLICK AQUI 𖣐",
  "sections": [
    {
      "title": "𖣐 Minato Creative",
      "rows": [
        
        {
          "header": "Ping",
          "title": "click para mostrar.",
          "description": "Velocidad e información sobre el bot.",
          "id": ".ping"
        },
        {
          "header": "Owner",
          "title": "click para mostrar",
          "description": "Numero del owner y su información.",
          "id": ".owner"
        }
      ]
    }
  ]
}`

              },                         
              {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"Canal","url":"https://whatsapp.com/channel/0029VarflA19RZARXpfQhp1X","merchant_url":"https://whatsapp.com/channel/0029VarflA19RZARXpfQhp1X"}`
              },
              {
                      name: "quick_reply",
                      buttonParamsJson: "{\"display_text\":\"Menu\",\"id\":\".menu\"}"
              },
              {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": `Copiar Numero De Serie`,
                "copy_code": `${sn}`
                })
              }
           ],
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 100,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363346794689649@newsletter',
                  newsletterName: '𖣐 GALLO CREATIVE 𖣐',
                  serverMessageId: 100
                }
                }
        })
    }
  }
}, { quoted: m })

/*await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id})*/
m.reply(txt_reg)
}

handler.help = ['verificar', 'registrar'].map(v => v + ' <nombre>.<edad>')

handler.command = /^(verificar|reg(istrar)?)$/i

export default handler