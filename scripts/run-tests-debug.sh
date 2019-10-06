#!/bin/sh

# Terminate all running services before starting
docker-compose stop --timeout=0 && docker-compose rm -f

# Build "test-debug" container - triggers initialializing Selenium Standalone in
# VNC enabled server
docker-compose build test-debug
docker-compose run test-debug

result=$?

# Clean up all running services
docker-compose stop --timeout=0 && docker-compose rm -f

exit $result
