FROM node:15

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

RUN apt-get update

RUN apt install -y python3-venv python3-pip

EXPOSE 8080

CMD ["npm", "start"]