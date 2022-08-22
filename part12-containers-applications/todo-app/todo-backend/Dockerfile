FROM node:16.16-alpine3.15
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
ENV DEBUG=playground:*
ENV PORT=3001
CMD npm start
