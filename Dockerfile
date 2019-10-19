FROM node:12

RUN apt update \
    && apt -y install libgl1-mesa-glx libxi6 \
    && rm -rf /var/lib/apt/lists/*

COPY ["package.json", "package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm install

COPY ["data", "data"]
COPY ["plugins", "plugins"]
COPY ["src", "src"]
COPY ["static", "static"]
COPY ["gatsby-config.js", "gatsby-node.js", "/usr/src/app/"]
