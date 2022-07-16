FROM node:16-alpine as build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /var/www/orientation
COPY --from=build /app/nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
