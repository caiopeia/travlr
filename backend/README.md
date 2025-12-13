# Backend

## Build and Run As Docker Container
```shell
./gradlew :backend:clean :backend:build
TAG="io.travlr.backend:latest"
docker build --tag=$TAG backend
docker run -it -p 80:80 $TAG
```
* open http://localhost/actuator/health in your browser
* or in shell
```shell
curl -f http://localhost/actuator/health
wget --no-verbose --tries=1 --spider http://localhost/actuator/health
```

## Debug
* execute shell inside running container from another terminal
```shell
docker exec -it 19c93d87d157 /bin/sh
```
