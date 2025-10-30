FROM amazoncorretto:21-alpine-jdk

COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
