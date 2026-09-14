FROM eclipse-temurin:21-jre
COPY target/newswirehub-api-1.0.0.jar app.jar
ARG db_host
ENV DB_HOST=$db_host
ENTRYPOINT ["java","-jar","/app.jar"]