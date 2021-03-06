FROM node:14-alpine

WORKDIR /usr/src/app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run start:prod
EXPOSE 3000
