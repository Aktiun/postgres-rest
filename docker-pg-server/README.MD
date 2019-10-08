# Starting Docker with PostgreSQL and Ticket Sales Data Source

Please make sure the following items are met:
* You are not running a process on port 5432
* You installed [docker](https://docs.docker.com/install/)
* The ticket_sales.csv file is on the same directory as the create.sh script. If you don't have it, you can download it from this url: https://drive.google.com/open?id=1I0KO9HALOW0Ln0WQ9a27MciBTAOGEtMo
* The chicago_taxi_dates.csv file needs to be on the same directory as the create.sh script. If you don't have it, you can download it from this url: https://drive.google.com/file/d/1fQ8b4k932BGzZlW1bY1JBSjJD9WnnShy/view?usp=sharing

Now you can run `./create.sh` and after the script ends, you can check if the container is running with the command `docker ps` the container has the name pg_ticket_sales.
