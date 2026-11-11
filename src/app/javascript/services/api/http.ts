import axios from 'axios';

/**
 * APIのhttp関連
 */

/** JSON通信用のヘッダー */
function jsonRequestHeaders() {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');

  const headers = {
    'X-CSRF-Token': token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
}

/** API送信 */
export async function sendApi(method: string, url: string, data: any = {}) {
  const headers = jsonRequestHeaders();

  if (method.toUpperCase() === 'POST') {
    const response = await axios.post(url, data, {
      headers: headers,
    });
    
    return response;
  } else {
    const response = await axios.get(url, {
      headers: headers,
    });

    return response;
  }
}
