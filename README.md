# Postgres over REST service

The *Postgres over REST* service provides a simple web api to query Postgres data warehouses. This project includes the following:

* A node server that provides the REST api to query your Postgres instance. Refer to its [README](https://github.com/Aktiun/postgres-rest/tree/master/local-server) file in the [local-server](https://github.com/Aktiun/postgres-rest/tree/main/local-server) folder for directions on how to start the node server.
* A script to start a Postgres docker container and upload test data.  The [docker-pg-server](https://github.com/Aktiun/postgres-rest/tree/main/docker-pg-server) folder includes a [README](https://github.com/Aktiun/postgres-rest/tree/master/docker-pg-server) file with additional directions.

## Security
This service does not attempt to provide authentication or authorization functionality.  Please use a security product such as Cognito to front this api and provide such services.

## How to test
Using ChartFactor Studio, you can use the Postgres/Redshift provider and URL http://127.0.0.1:3000 to visualize your data files.
