exports.handler = async function () {
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
        'Access-Control-Allow-Origin': '*'
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
