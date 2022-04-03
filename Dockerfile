FROM node:16

WORKDIR /usr/src/cultureman

COPY package*.json ./

RUN npm i 

COPY . .

CMD ["node", "bot.js"]