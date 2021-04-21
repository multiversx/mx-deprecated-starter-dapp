FROM node:12.22.0-alpine3.12 as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
RUN python -m ensurepip
RUN pip install --no-cache --upgrade pip setuptools

RUN apk update && apk add --update --no-cache alpine-sdk libusb-dev musl-dev linux-headers eudev-libs eudev-dev

RUN npm ci

COPY . ./
RUN npm run build-testnet

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]