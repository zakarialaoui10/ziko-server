export function Page({ head = {}, ui, headSchema } = {}) {
  // Validate head if schema is provided
  if (headSchema) {
    head = headSchema.parse(head);
  }

  return { head, ui };
}
