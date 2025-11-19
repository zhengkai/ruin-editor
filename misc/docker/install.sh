#!/bin/bash

TARGET="Freya"

if [ "$HOSTNAME" != "$TARGET" ]; then
	>&2 echo only run in server "$TARGET"
	exit 1
fi

sudo docker stop ruin
sudo docker rm ruin
sudo docker rmi ruin

sudo cat /tmp/docker-ruin.tar | sudo docker load

sudo docker run -d --name ruin \
	--mount type=bind,source=/www/ruin/log,target=/log \
	--mount type=bind,source=/www/ruin/static,target=/static \
	--restart always \
	ruin
