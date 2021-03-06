#!/bin/sh

# Terminate all running services before starting
docker-compose stop --timeout=0 && docker-compose rm -f

# VNC enabled server
docker-compose build test-debug
docker-compose run test-debug

result=$?

# Clean up all running services
docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
