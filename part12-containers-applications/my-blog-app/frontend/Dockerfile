FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:3003"

RUN npm ci

RUN npm run build



# new stage
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
