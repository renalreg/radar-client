FROM node:14 AS dev

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

RUN apt-get update

RUN apt-get install -y dos2unix

RUN dos2unix /app/build.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

RUN /app/build.sh
