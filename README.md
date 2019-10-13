vanity
======

Personal website, created with [Gatsby.js](https://www.gatsbyjs.org/).

To develop, run:
```sh
docker run --rm --volume $PWD:/usr/src/app --workdir /usr/src/app node:8 npm install
docker run --rm -it -p 8000:8000 --volume $PWD:/usr/src/app --workdir /usr/src/app node:8 npm run develop
```
and visit http://localhost:8000/


To build a production environment:
```sh
docker run --rm --env NODE_ENV=production --volume $PWD:/usr/src/app --workdir /usr/src/app node:8 npm install
docker run --rm --env NODE_ENV=production --volume $PWD:/usr/src/app --workdir /usr/src/app node:8 npm run build
```
