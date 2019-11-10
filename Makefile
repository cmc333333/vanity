.PHONY: dev prod start-dev-server

prod:
	docker build . --tag cmc333333/vanity:prod --build-arg NODE_ENV=production
	docker rm builder | true
	docker run --name builder --env-file .env cmc333333/vanity:prod npm run build
	docker cp builder:/usr/src/app/public public-new
	docker rm builder
	ls public-new/index.html
	rm -rf public
	mv public-new public

dev:
	docker build . --tag cmc333333/vanity
	docker run --rm -it --env-file .env --volume ${PWD}:/usr/src/app cmc333333/vanity npm install

start-dev-server:
	docker run --rm -it --env-file .env --volume ${PWD}:/usr/src/app -p8000:8000 cmc333333/vanity npm run develop
