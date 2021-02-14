# vanity

Personal website, created with [Gatsby.js](https://www.gatsbyjs.org/).

To develop, add the `GPODDER_PASSWORD` to the .env file, then run:

```sh
make dev
make start-dev-server
```

and visit http://localhost:8000/

To build a production environment:

```sh
make prod
```

## Adding a certificate

Let's Encrypt is set up to autorenew every few hours, but we need to take a
little bit of extra action to kick the process off at the beginning.

First, modify `nginx/https.conf` to turn off the HTTPS redirect (see comments
there). Then restart `docker-compose` and drop into a certbot shell:
```sh
docker-compose down
docker-compose up -d
domcer-compose run --rm --entrypoint certbot certonly --cert-name [SERVER_NAME] --domain [SERVER_NAME],other.[SERVER_NAME]
```
Follow the prompts, entering `/var/www/html` when prompted.

Don't forget to reset the HTTPS redirect!
