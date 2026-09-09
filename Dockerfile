# Production image for Cloud Run service lightround-web.
# Standalone Next.js server listens on 0.0.0.0:$PORT (Cloud Run default 8080).
FROM node:22-bookworm-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN mkdir -p public .next && chown node:node public .next

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 8080

# Cloud Run injects PORT and sets HOSTNAME to the instance id. Next.js standalone
# binds to HOSTNAME, so force 0.0.0.0 at start. PORT is read from the environment.
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 exec node server.js"]
