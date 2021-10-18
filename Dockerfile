FROM node:13

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

RUN apt-get update

# RUN apt install -y python3-venv python3-pip

# RUN python3 -m pip install fabric

EXPOSE 8080

CMD ["npm", "start"]