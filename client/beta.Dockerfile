FROM node:16-alpine as build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY ./ ./
RUN yarn build --mode beta

FROM nginx:1.15
COPY --from=build /app/dist /var/www/orientation
COPY --from=build /app/nginx.conf /etc/nginx
EXPOSE 80
