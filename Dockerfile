FROM node:10.15.0-alpine

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm i
