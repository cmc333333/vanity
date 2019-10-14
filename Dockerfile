FROM node:8

RUN apt update \
    && apt -y install libgl1-mesa-glx libxi6 \
    && rm -rf /var/lib/apt/lists/*

COPY ["package.json", "package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm install

COPY ["data", "plugins", "src", "static", "/usr/src/app/"]
