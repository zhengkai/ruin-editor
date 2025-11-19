SHELL:=/bin/bash

TARGET_HOST:=freya

build: git
	sudo docker build -t ruin -f Dockerfile ../..

run: build
	sudo docker run --env \
		--mount type=bind,source=/www/editor/static,target=/static \
		--mount type=bind,source=/www/editor/server/dist/prod/log,target=/log \
		ruin

install: build
	sudo docker save ruin > docker-ruin.tar
	scp docker-ruin.tar $(TARGET_HOST):/tmp
	scp install.sh $(TARGET_HOST):/tmp
	ssh $(TARGET_HOST) "chmod +x /tmp/install.sh && /tmp/install.sh && rm /tmp/install.sh"

git:
	../../server/build/git-hash.sh > ../../server/build/.git-hash

clean:
	sudo docker stop ruin || :
	sudo docker rm ruin || :
	sudo docker rmi ruin || :
	sudo docker image prune --force
