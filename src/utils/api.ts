const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export async function apiGet<T>(url: string, accessToken?: string): Promise<T> {
  const headers = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const res = await fetch(API_BASE + url, {
    headers,
  });


  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(
  url: string,
  body: unknown,
  accessToken?: string
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const res = await fetch(API_BASE + url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function apiPostFormData<T>(
  url: string,
  formData: FormData,
  accessToken?: string
): Promise<T> {
  const headers = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    // Don't set Content-Type - let browser set it automatically for FormData
  };

  const res = await fetch(API_BASE + url, {
    method: "POST",
    headers,
    body: formData, // Don't JSON.stringify FormData
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}