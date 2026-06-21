export async function fetchBlog(slug: string = "blog-home", token?: string): Promise<any | null> {
  try {
    // 1. Build the URL with the required slug query parameter
    const url = `/admin/blog/get?slug=${encodeURIComponent(slug)}`;

    // 2. Set up headers, including the token if provided
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
    console.error("Error fetching Blog data:", err);
    return null;
  }
}

export default fetchBlog;