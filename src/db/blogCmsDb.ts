export async function fetchBlog(slug: string = "blog-home", token?: string): Promise<any | null> {
  try {
    // 1. Build the URL with the required slug query parameter
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) throw new Error("Missing SITE_URL/NEXT_PUBLIC_SITE_URL");
    const url = new URL("/admin/blog/get", baseUrl);
    url.searchParams.set("slug", slug);
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