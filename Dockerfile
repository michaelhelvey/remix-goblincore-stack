FROM node:lts

ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY public .
COPY remix.config.js .
COPY build .
COPY node_modules .

CMD ["npm", "start"]
