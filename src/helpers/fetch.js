
const baseUrl = 'https://api-prueba-v131.onrender.com';
export const fetchSinToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  try {
    const resp = method === 'GET'
      ? await fetch(url)
      : await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    const text = await resp.text();
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = { message: text };
    }
    if (!resp.ok) {
      throw new Error(
        responseData.message || `Error en la respuesta: ${resp.status}`
      );
    }
    return responseData;
  } catch (error) {
    console.error('❌ Error al hacer la solicitud pa:', error.message);
    throw error;
  }
};
