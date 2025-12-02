FROM amazoncorretto:21-alpine-jdk

COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
# fixme do we really need to do this here or can you also just configure a port mapping in cdk?
EXPOSE 80
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
