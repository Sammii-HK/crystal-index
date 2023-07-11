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
    NEXT_PUBLIC_OPENCAGE_API_KEY="$(cat /run/secrets/NEXT_PUBLIC_OPENCAGE_API_KEY)" \
    yarn build
# RUN --mount=type=secret,id=NEXT_PUBLIC_OPENCAGE_API_KEY NEXT_PUBLIC_OPENCAGE_API_KEY="$(cat /run/secrets/NEXT_PUBLIC_OPENCAGE_API_KEY)", \
#     --mount=type=secret,id=NEXT_PUBLIC_DATABASE_URL NEXT_PUBLIC_DATABASE_URL="$(cat /run/secrets/NEXT_PUBLIC_DATABASE_URL)" \
#     yarn build
# RUN --mount=type=secret,\
# id=NEXT_PUBLIC_OPENCAGE_API_KEY NEXT_PUBLIC_OPENCAGE_API_KEY="$(cat /run/secrets/NEXT_PUBLIC_OPENCAGE_API_KEY)"  yarn build



  # fly deploy \                                                                                   
  #   --build-secret NEXT_PUBLIC_OPENCAGE_API_KEY=116d85870b9e49a187bf65380825f926 
  #   --build-secret DATABASE_URL=postgresql://postgres:postgres@localhost:5432/crystal_index_dev?schema=public --remote-only


  # fly deploy \                                                                                   
  #   --build-secret NEXT_PUBLIC_OPENCAGE_API_KEY=116d85870b9e49a187bf65380825f926 --remote-only



FROM node:16-alpine3.16
RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/app /app/app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production

CMD ["yarn", "start"]