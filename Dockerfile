FROM node:20-bookworm AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Fix line endings for shell scripts
RUN apt-get update && \
    apt-get install -y dos2unix && \
    dos2unix /app/build.sh && \
    apt-get purge -y dos2unix && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN chmod +x /app/build.sh && /app/build.sh

FROM nginx:1.27-alpine AS prod

COPY --from=dev /app/dist/ /usr/share/nginx/html
