export async function API_HANDLER(fn, req, res) {
  const result = await fn(req, res);

  // 1️⃣ If it's a Fetch Response (like Astro or Next)
  if (result instanceof Response) {
    const body = await result.text();
    res
      .status(result.status || 200)
      .set(Object.fromEntries(result.headers.entries()))
      .send(body);
    return;
  }

  // 2️⃣ If it's a plain object (auto-JSON)
  if (typeof result === "object" && result !== null) {
    res.json(result);
    return;
  }

  // 3️⃣ If it's a string or number (send as text)
  if (["string", "number", "boolean"].includes(typeof result)) {
    res.send(String(result));
    return;
  }

  // 4️⃣ If it handled itself (returns undefined or void)
  if (result === undefined) return;

  // 5️⃣ Fallback
  res.status(500).send("Unsupported response type");
}