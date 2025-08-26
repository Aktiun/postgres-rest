# Postgres over REST service

The *Postgres over REST* service provides a simple web api to query Postgres/Redshift data warehouses. This project includes the following:

* A docker container that includes test data.  Go to the docker-pg-server folder where you will find a [README](https://github.com/Aktiun/postgres-rest/tree/master/docker-pg-server) file with additional directions
* A node server that provides the REST api to query your local Postgres instance.  You can adjust its config.json file to query different instances.  Refer to its [README](https://github.com/Aktiun/postgres-rest/tree/master/local-server) file for directions on how to start the node server.

## Security
This service does not attempt to provide authentication or authorization functionality.  Please use a security product such as Cognito to front this api and provide such services.

## How to test
Using ChartFactor Studio, you can use the Postgres/Redshift provider and URL http://127.0.0.1:3000 to visualize your data files.
