FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV DEBUG=playground:*

RUN npm install

CMD ["npm", "run", "dev"]