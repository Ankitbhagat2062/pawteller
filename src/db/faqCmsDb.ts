export async function fetchFaq(pageKey: string): Promise<any | null> {
  try {
    // 1. Build the URL with the required pageKey query parameter
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");
    const url = new URL("/api/admin/faq/get", baseUrl);
    url.searchParams.set("pageKey", pageKey);
    // 2. Set up headers, including the token if provided
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const res = await fetch(url.toString(), {
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
    console.error(`Error fetching FAQ data for ${pageKey}:`, err);
    return null;
  }
}

export default fetchFaq;