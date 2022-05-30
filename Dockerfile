FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 3000

RUN npx prisma generate

RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline
RUN yarn cache clean

CMD ["yarn", "start"]