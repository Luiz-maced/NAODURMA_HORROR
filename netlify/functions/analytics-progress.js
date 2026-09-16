exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { Allow: 'GET' }, body: 'Method Not Allowed' };
  }

  if (!process.env.OMNY_API_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OMNY_API_TOKEN não configurado' }) };
  }

  try {
    const response = await fetch('https://api.omnystudio.com/v1/analytics/progress', {
      headers: {
        Authorization: `Bearer ${process.env.OMNY_API_TOKEN}`
      }
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex'
      },
      body
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erro ao consultar o Analytics' })
    };
  }
};
