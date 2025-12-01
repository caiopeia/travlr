# Backend
## Build and Run As Docker Container
```shell
./gradlew clean build
TAG="travlr.backend:latest"
docker build --tag=$TAG .
docker run -it -p 8080:8080 $TAG
```
* open http://localhost:8080/mono in your browser
