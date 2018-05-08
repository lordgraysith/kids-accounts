FROM mhart/alpine-node:8

RUN mkdir /app
RUN mkdir /app/client
WORKDIR /app/client
COPY client/package.json /app/client
COPY client/yarn.lock /app/client
RUN yarn
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn
COPY client/ /app/client/
COPY server/ /app/server/
COPY config/ /app/config/

EXPOSE 3000
CMD ["yarn", "start"]
