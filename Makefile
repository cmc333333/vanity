.PHONY: dev prod start-dev-server

prod:
	docker build . --tag cmc333333/vanity:prod --build-arg NODE_ENV=production
	docker run --rm  --env-file .env cmc333333/vanity:prod npm run build

dev:
	docker build . --tag cmc333333/vanity
	docker run --rm --env-file .env --volume ${PWD}:/usr/src/app cmc333333/vanity npm install

start-dev-server:
	docker run --rm --env-file .env --volume ${PWD}:/usr/src/app -p8000:8000 cmc333333/vanity npm run develop
