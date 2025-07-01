# PostgreSQL REST service

## Starting the service for development

- Make sure your node is version 16
- Run `npm i` the first time to install package dependencies
- Run the following command:

```
node server.js
```

## Using Docker

## Creating Docker image

```
docker build -t postgres-rest .
```

## Running Docker container

```
docker run -p 3000:3000 \
  -e PGHOST=host.docker.internal \
  -e PGPORT=5432 \
  -e PGUSER=postgres \
  -e PGPASSWORD=passpg \
  -e PGDATABASE=postgres \
  postgres-rest
```