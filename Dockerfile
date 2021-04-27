FROM node:15

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["npm", "start"]