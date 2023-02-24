FROM node:16-alpine3.16 AS builder
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install
COPY . /app
EXPOSE 3000
RUN npx prisma generate
RUN --mount=type=secret,id=NEXT_PUBLIC_OPENCAGE_API_KEY \
    NEXT_PUBLIC_OPENCAGE_API_KEY="$(cat /run/secrets/NEXT_PUBLIC_OPENCAGE_API_KEY)" yarn build






FROM node:16-alpine3.16
RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/.next /app/.next

COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production

CMD ["yarn", "start"]