FROM amazoncorretto:21-alpine-jdk

COPY build/libs/backend-*.jar app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
