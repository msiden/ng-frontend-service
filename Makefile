
build-local:
	cd app; npm run build

build-local-docker:
	docker build --no-cache -t ng-frontend-service -f ./app/Dockerfile.dev ./app

build-deploy:
	docker build --no-cache -t ng-frontend-service:latest ./app

run-local:
	cd app; npm run start

run-local-docker: build-local-docker
	docker run -ti -p 3000:3000 ng-frontend-service

run-deploy-local: build-deploy
	docker run -ti -p 3000:3000 ng-frontend-service:latest
