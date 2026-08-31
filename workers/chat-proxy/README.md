# JNCO Chat Proxy — Cloudflare Worker

Secure server-side proxy between the portfolio chatbot and the Gemini 2.0 Flash API.
The Gemini API key **never touches the client bundle** — it lives only here as a Cloudflare secret.

## Security layers

| Layer | What it does |
|---|---|
| Origin allowlist | Rejects requests from any domain not in `ALLOWED_ORIGINS` |
| CORS locked | No wildcard — only the portfolio domain gets CORS headers |
| Rate limiting | 10 req/min · 100 req/day per IP (in-memory sliding window) |
| Method guard | POST only — all other methods return 405 |
| Content-Type check | Rejects non-JSON requests |
| Payload size cap | Rejects bodies > 4 KB |
| Input sanitisation | Strips HTML tags and control characters server-side |
| Message length cap | 500 characters max |
| Injection detection | Blocks known jailbreak / prompt-extraction patterns |
| API key isolation | Key stored as Cloudflare secret — never in source code or client |
| Knowledge base isolation | KB is a server-side constant — never sent to client |
| Response sanitisation | Scrubs any accidentally leaked key patterns from Gemini output |
| Generic error messages | No internal stack traces or config details sent to client |
| 8s timeout | Aborts hanging Gemini requests |
| Gemini safety settings | BLOCK_MEDIUM_AND_ABOVE on all harm categories |
| Token cap | maxOutputTokens: 350 — prevents runaway costs |

## One-time setup

### Prerequisites
```bash
npm install -g wrangler
wrangler login
```

### Deploy

```bash
# 1. Get a free Gemini API key at https://aistudio.google.com
# 2. Store it as a Cloudflare secret (never in wrangler.toml or source)
cd workers/chat-proxy
wrangler secret put GEMINI_API_KEY
# Paste your key when prompted — it's encrypted and stored by Cloudflare

# 3. Deploy the worker
wrangler deploy
# → Outputs your worker URL: https://jnco-chat-proxy.YOUR_SUBDOMAIN.workers.dev
```

### Connect to portfolio

```bash
# In jnco-portfolio root, create .env.local from the template
cp .env.local.example .env.local
# Edit .env.local and paste your worker URL
# Then rebuild and redeploy:
npm run build
firebase deploy
```

### Local development

```bash
cd workers/chat-proxy
cp .dev.vars.example .dev.vars
# Edit .dev.vars with your Gemini key
wrangler dev
```

## Free tier limits

- **Cloudflare Workers**: 100,000 requests/day, 10ms CPU/request — free forever
- **Gemini 2.0 Flash**: 15 RPM, 1 million tokens/day — free tier

Combined with the keyword-first layer in the portfolio (handles ~80% of traffic locally), the AI fallback rarely fires. You'd need thousands of unique visitors asking complex questions before approaching any limit.
