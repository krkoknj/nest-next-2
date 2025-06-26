export async function fetcher(input: RequestInfo, init: RequestInit = {}) {
  console.log("API 호출:", input, init);
  const res = await fetch(input, {
    ...init,
    credentials: "include", // 쿠키 포함
  });

  console.log("API 응답:", res.status, res.statusText);

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) throw new Error("API 호출 실패");
  return res.json();
}
