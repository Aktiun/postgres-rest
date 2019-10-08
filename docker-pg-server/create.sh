#!/bin/sh

echo "Removing old container instance"
docker rm -f pg_ticket_sales
echo "Pruning orphans docker objects"
docker container prune -f
docker volume prune -f
echo "Creating new container instance"
docker run -d -p 5432:5432 --name pg_ticket_sales -v "$PWD"/:/opt/demo/ -e POSTGRES_PASSWORD=passpg -d postgres
sleep 2

echo "Creating Ticket Sales Table Schema"
docker exec -it pg_ticket_sales psql -U postgres -f /opt/demo/ticket_sales.sql
echo "Uploading Ticket Sales Data"
docker exec -it pg_ticket_sales psql -U postgres -d postgres -c "\COPY ticket_sales(salesid,listid,sellerid,buyerid,eventid,dateid,qtysold,pricepaid,commission,saletime,venueid,catid,eventname,starttime,catgroup,catname,catdesc,venuename,venuecity,venuestate,venueseats,userid,username,firstname,lastname,city,state,email,phone,likesports,liketheatre,likeconcerts,likejazz,likeclassical,likeopera,likerock,likevegas,likebroadway,likemusicals) FROM '/opt/demo/ticket_sales.csv' DELIMITER ',' CSV HEADER;"
echo "Updating Ticket Sales Timezones fields"
docker exec -it pg_ticket_sales psql -U postgres -f /opt/demo/update_timezone.sql
echo "Creating Chicago Taxi Trips Table Schema"
docker exec -it pg_ticket_sales psql -U postgres -f /opt/demo/chicago_taxi_trips.sql
echo "Uploading Chicago Taxi Trips Data"
docker exec -it pg_ticket_sales psql -U postgres -d postgres -c "\COPY chicago_taxi_trips(fare, pickup_census_tract, trip_end_hour, trip_start_hour, trip_seconds, trip_start_day_of_week, trip_miles, extras, dropoff_census_tract, tips, tolls, dropoff_community_area, pickup_district, company, dropoff_community_area_desc, trip_end_timestamp, trip_end_day_of_week, pickup_community_area_desc, trip_id, trip_total, pickup_location_lat, pickup_location_lon, trip_start_timestamp, community_areas, trip_minutes, pickup_community_area, payment_type, dropoff_district, taxi_id, dropoff_location_lat, dropoff_location_lon, dropoff_latitude, pickup_latitude, pickup_longitude, dropoff_longitude, trip_start_timestamp_epoch, trip_start_date_string) FROM '/opt/demo/chicago_taxi_trips.csv' DELIMITER ',' CSV HEADER;"