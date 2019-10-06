#!/bin/sh

# Terminate all running services before starting
docker-compose stop --timeout=0 && docker-compose rm -f

# Start 5 instances of node-chrome - self-registers to Selenium Hub
docker-compose up --force-recreate --detach --scale node-chrome=5 node-chrome

# Build "test" container - triggers initialializing Selenium Hub
docker-compose build test
docker-compose run test

result=$?

# Clean up all running services
docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
