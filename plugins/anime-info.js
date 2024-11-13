import fetch from 'node-fetch'

var handler = async (m, { conn, text }) => {
    if (!text) throw m.reply(`*𖣐 Ingresa el nombre del anime que desea ver la información!*`);

    let res = await fetch('https://api.jikan.moe/v4/anime?q=' + text);

    if (!res.ok) throw m.reply('No info');

    let json = await res.json();
    let animeData = json.data[0];

    if (!animeData) throw m.reply('No info');

    let {
        title_japanese,
        url,
        type,
        score,
        members,
        status,
        synopsis,
        favorites,
        images,
        genres,
    } = animeData;

    let genreList = genres.map((genre) => genre.name).join(', ');

    let animeingfo = `
𖣐 *Titulo: ${title_japanese}
𖣐 *Tipo: ${type}
𖣐 *Genero: ${genreList}
𖣐 *Puntuación: ${score}
𖣐 *Miembros: ${members}
𖣐 *Estado: ${status}
𖣐 *Favoritos: ${favorites}
𖣐 *Link: ${url}
𖣐 *Synopsis: ${synopsis}
`;

    conn.sendFile(m.chat, images.jpg.image_url, 'anjime.jpg', `*ANIME INFO*\n` + animeingfo, m);
};

handler.help = ['animeinfo <anime>'];
handler.tags = ['anime'];
handler.command = /^(animeinfo)$/i;

handler.register = true

export default handler
