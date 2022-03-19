FROM node:16

WORKDIR /usr/src/cultureman

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 27017
CMD ["node", "bot.js"]