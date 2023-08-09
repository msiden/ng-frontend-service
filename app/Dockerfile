FROM node:19.2.0

ADD package-lock.json package.json /tmp/
WORKDIR /tmp
RUN npm ci
RUN npm install -g serve

RUN mkdir -p /usr/src/app && cd /usr/src/app && ln -s /tmp/node_modules

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
