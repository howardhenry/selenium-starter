#!/bin/sh

# Terminate all running services before starting
docker-compose stop --timeout=0
docker-compose rm -f

# Start 5 instances of node-chrome - self-registers to Selenium Hub
docker-compose up --detach --scale selenium-grid-node-chrome=${MAX_WORKERS:-5} selenium-grid-node-chrome

# Build "test" container - triggers initializing Selenium Hub
docker-compose build test
docker-compose run test

result=$?

# Clean up all running services
docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
