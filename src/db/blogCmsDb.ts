import useAdminToken from "@/hooks/token";

export async function fetchBlog(slug: string = "blog-home",): Promise<any | null> {
  try {
    const { adminAuthToken: token } = useAdminToken()
    // 1. Build the URL with the required slug query parameter
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");
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