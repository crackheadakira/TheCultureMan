FROM node:alpine

WORKDIR /usr/bot

COPY package*.json ./

COPY . .

RUN npm i

EXPOSE 27017
CMD ["node", "bot.js"]