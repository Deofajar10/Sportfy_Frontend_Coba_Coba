const API_BASE_URL = 'http://localhost:4000/api';

const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

export async function apiClient(path, { method = 'GET', data, headers } = {}) {
  const token = getToken();
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(headers || {}),
  };

  if (token) {
    mergedHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: mergedHeaders,
    body: data ? JSON.stringify(data) : undefined,
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const message = payload.message || payload.error || 'Permintaan gagal';
    throw new Error(message);
  }

  return payload;
}

export { API_BASE_URL };
