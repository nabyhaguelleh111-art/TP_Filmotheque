// Transforme un lien YouTube (watch, youtu.be, embed) en URL intégrable.
export function toEmbedUrl(url) {
  if (!url) return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  const patterns = [
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}`;
    }
  }

  return trimmed;
}

// Vérifie que le lien peut bien être affiché dans une iframe (YouTube / Vimeo).
export function isEmbeddable(url) {
  return /^https?:\/\/(www\.)?(youtube(-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/)/.test(
    url
  );
}
