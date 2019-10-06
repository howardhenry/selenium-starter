#!/bin/sh

docker-compose stop --timeout=0 && docker-compose rm -f

docker-compose up --force-recreate --detach --scale node-chrome=5 node-chrome
docker-compose build test
docker-compose run test

result=$?

docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
