export default async function middleware(request) {
  const url = new URL(request.url);
  const acceptHeader = request.headers.get('accept') || '';

  // Intercept root/homepage requests when client accepts markdown
  if (url.pathname === '/' && acceptHeader.includes('text/markdown')) {
    try {
      const llmsTxtUrl = new URL('/llms.txt', request.url);
      const res = await fetch(llmsTxtUrl);
      if (res.ok) {
        const text = await res.text();
        // A simple token estimation (roughly 1 token per 4 characters)
        const tokenCount = Math.round(text.length / 4);

        return new Response(text, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'x-markdown-tokens': String(tokenCount)
          }
        });
      }
    } catch (e) {
      console.error('Markdown content negotiation middleware error:', e);
    }
  }
}
