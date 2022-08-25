FROM node:16.16-alpine3.15
WORKDIR /usr/src/app
COPY . .
RUN npm install 
ENV DEBUG=playground:*
ENV PORT=3001
CMD ["npm", "run", "dev"]
