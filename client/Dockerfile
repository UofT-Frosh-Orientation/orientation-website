FROM node:16-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++ \
&& yarn install \
&& apk del build-dependencies

COPY ./ ./
CMD ["yarn", "run", "dev"]
