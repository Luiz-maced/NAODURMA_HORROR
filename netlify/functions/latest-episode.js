exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { Allow: 'GET' }, body: 'Method Not Allowed' };
  }

  try {
    const response = await fetch('https://omny.fm/shows/n-o-durma-horror/playlists/podcast.rss');
    if (!response.ok) throw new Error(`RSS retornou ${response.status}`);

    const rss = await response.text();
    const itemMatch = rss.match(/<item>([\s\S]*?)<\/item>/i);
    const item = itemMatch?.[1] || '';
    const title = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim();
    const link = item.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim();

    if (!link) throw new Error('Nenhum episódio encontrado no RSS');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex'
      },
      body: JSON.stringify({ title, link })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Não foi possível carregar o último episódio' })
    };
  }
};
