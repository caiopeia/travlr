# Backend
## Build and Run As Docker Container
* set JAVA_HOME env var to java 21 sdk
```shell
./gradlew :backend:clean :backend:build
TAG="travlr.backend:latest"
docker build --tag=$TAG backend
docker run -it -p 80:80 $TAG
```
* open http://localhost:80/mono in your browser
* or in shell
```shell
curl -f http://localhost:80/mono
wget --no-verbose --tries=1 --spider http://localhost:80/mono
```

# DEBUG 
* execute shell inside running container from another terminal
```shell
docker exec -it 19c93d87d157 /bin/sh
```
