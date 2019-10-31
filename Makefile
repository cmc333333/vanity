.PHONY: dev prod start-dev-server

prod:
	docker build . --tag cmc333333/vanity:prod --build-arg NODE_ENV=production
	docker run --rm -it --env-file .env --volume ${PWD}/public-new:/usr/src/app/public cmc333333/vanity:prod npm run build
	ls public-new/index.html
	rm -rf public
	mv public-new public

dev:
	docker build . --tag cmc333333/vanity
	docker run --rm -it --env-file .env --volume ${PWD}:/usr/src/app cmc333333/vanity npm install

start-dev-server:
	docker run --rm -it --env-file .env --volume ${PWD}:/usr/src/app -p8000:8000 cmc333333/vanity npm run develop
