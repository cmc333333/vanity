.PHONY: dev prod shell start-dev-server trakt-sign-in
start_cmd = docker run --rm -it --env-file .env --volume ${PWD}:/usr/src/app
image = cmc333333/vanity

prod:
	docker build . --tag ${image}:prod --build-arg NODE_ENV=production
	docker rm builder | true
	docker run --name builder --env-file .env --volume /home/cmc/vanity/.env:/usr/src/app/.env ${image}:prod npm run build
	docker cp builder:/usr/src/app/public public-new
	docker rm builder
	ls public-new/index.html
	rm -rf public
	mv public-new public

dev:
	docker build . --tag ${image}
	${start_cmd} ${image} npm install


shell:
	${start_cmd} ${image} bash

start-dev-server:
	${start_cmd} -p 8000:8000 ${image} npm run develop

trakt-sign-in:
	${start_cmd} ${image} npm run trakt-sign-in
