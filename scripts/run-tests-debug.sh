#!/bin/sh

docker-compose stop --timeout=0 && docker-compose rm -f

docker-compose build test-debug
docker-compose run test-debug

result=$?

docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
