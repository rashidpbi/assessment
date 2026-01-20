const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';

export async function proxyRequest(path: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL}${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}
