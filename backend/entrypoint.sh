#!/bin/bash

set -e

if [ -f tmp/pids/server.pid ]; then
    rm tmp/pids/server.pid
fi

echo "Run migrations"
bundle exec rails db:migrate

echo "Starting app server ...3000"
bundle exec rails s -p 3000 -b '0.0.0.0'
