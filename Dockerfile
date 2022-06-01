FROM node:16-alpine AS builder
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install
COPY . /app
EXPOSE 3000
RUN npx prisma generate
RUN yarn build






FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/.next /app/.next

COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production

CMD ["yarn", "start"]