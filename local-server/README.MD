# PostgreSQL REST service

## Starting the service for development

- Make sure your node is version 16
- Run `npm i` the first time to install package dependencies
- Run the following command:

```
node server.js
```

## Using Docker

### Creating Docker image

```
docker build -t postgres-rest:latest .
```

### Running Docker container

```
docker run -p 3000:3000 \
  -e PGHOST=host.docker.internal \
  -e PGPORT=5432 \
  -e PGUSER=postgres \
  -e PGPASSWORD=passpg \
  -e PGDATABASE=postgres \
  postgres-rest
```

### Push to Docker Hub

```
export DOCKER_PASSWORD='your_actual_password_or_token'
export NAMESPACE='your_user_name'
echo "$DOCKER_PASSWORD" | docker login --username $NAMESPACE --password-stdin
# Assuming you built your image as "postgres-rest:latest"
docker tag postgres-rest:latest $NAMESPACE/postgres-rest:latest
# Push
docker push $NAMESPACE/postgres-rest:latest
```

#### Verify successful push to Docker Hub

Visit https://hub.docker.com/repository/docker/{namespace}/postgres-rest and you should see your image’s tags.

### Running Docker container using existing image in Docker Hub

```
docker run -p 3000:3000 \
  -e PGHOST=host.docker.internal \
  -e PGPORT=5432 \
  -e PGUSER=postgres \
  -e PGPASSWORD=passpg \
  -e PGDATABASE=postgres \
  jorgealarcon/postgres-rest:latest
```
