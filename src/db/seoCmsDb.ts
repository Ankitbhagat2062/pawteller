export async function fetchSeo(pageKey: string, token?: string): Promise<any | null> {
  try {
    // 1. Build the URL with the required pageKey query parameter
    const url = `/admin/seo/get?pageKey=${encodeURIComponent(pageKey)}`;

    // 2. Set up headers, adding the Authorization header if a token is provided
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store'
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching SEO data:", err);
    return null;
  }
}

export default fetchSeo;