FROM node:18-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY ./ ./

FROM node:18-alpine
COPY --from=build /app /app
WORKDIR /app
CMD ["yarn", "start"]
