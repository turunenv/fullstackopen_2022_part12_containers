FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://backend:3001"

RUN npm install

CMD ["npm", "start"]