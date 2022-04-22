#!/bin/sh
CONTAINER_NAME=prisma_sample

DB_NAME=prisma_sample_dev
DB_USER=$DB_NAME
DB_PASS=$DB_NAME

DB_PORT=3333

docker inspect $CONTAINER_NAME > /dev/null 2>&1
if test "$?" = "0"; then
  docker start $CONTAINER_NAME
else
  docker run --name $CONTAINER_NAME \
    -d \
    -p $DB_PORT:3306 \
    -e MYSQL_DATABASE=$DB_NAME \
    -e MYSQL_USER=$DB_USER \
    -e MYSQL_PASSWORD=$DB_PASS \
    -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
    -e LANG=C.UTF-8 \
    -v "${PWD}/.db_data":/docker-entrypoint-initdb.d \
    mysql:5.7.37 --character-set-server=utf8mb4 --collation-server=utf8mb4_bin --max_allowed_packet=128M
  echo "DONE"
fi