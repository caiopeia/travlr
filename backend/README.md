# Backend
## Run
* open http://localhost:8080/mono in your browser
    * run spring backend service from IDE
    * [run as docker container](backend/README.md#run-as-docker-container)

### As Docker Container
```shell
./gradlew clean build
TAG="travlr.backend:latest"
docker build --tag=$TAG .
docker run -p8080:8080 $TAG
```
