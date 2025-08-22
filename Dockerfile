# Install dependencies only when needed
FROM node:18-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack and pnpm
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm with frozen-lockfile
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

# Enable corepack and pnpm
RUN corepack enable pnpm

COPY --from=base /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/docs/getting-started
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir -p .next ./public \
    && chown nextjs:nodejs .next ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public/ ./public/

USER nextjsdocker tag your-image-name your-dockerhub-username/your-image-namedocker tag your-image-name your-dockerhub-username/your-image-namedocker tag your-image-name your-dockerhub-username/your-image-namedocker tag your-image-name your-dockerhub-username/your-image-namedocker tag your-image-name your-dockerhub-username/your-image-namedocker tag your-image-name your-dockerhub-username/your-image-name

EXPOSE 3000

# Ensure server.js exists or fallback to Next.js built-in server
CMD ["node", "server"]
