exports.handler = async function () {
  const url =
    'https://api.omnystudio.com/v1/clips/search' +
    '?visibilityFilter=Unlisted&pageSize=50&sortBy=DateNewest';

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.OMNY_API_TOKEN}`
      }
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erro ao consultar episódios' })
    };
  }
};
