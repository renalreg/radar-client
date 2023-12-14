FROM node:15.14.0-buster AS dev

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

# Deals with line endings

# RUN echo "deb http://security.debian.org/debian-security bullseye-security main contrib non-free" > /etc/apt/sources.list

RUN apt-get update

RUN apt-get install -y dos2unix

RUN dos2unix /app/build.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

RUN /app/build.sh

FROM nginx:1.20.2 AS prod

COPY --from=dev /app/dist/ /usr/share/nginx/html