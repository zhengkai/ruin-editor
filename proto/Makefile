SHELL:=/bin/bash

PBJS=../client/node_modules/protobufjs-cli/bin/pbjs
PBTS=../client/node_modules/protobufjs-cli/bin/pbts

PROTO_DIR=/www/ruin/proto

server:
	protoc -I $(PROTO_DIR) \
		--go_out=../server/src \
		--go_opt=Masset.proto=/pb \
		--go_opt=Mpose.proto=/pb \
		$(PROTO_DIR)/*.proto

client:
	$(PBJS) -t static-module -w es6 --es6 --force-number -o ../client/src/pb/pb.js $(PROTO_DIR)/*.proto
	$(PBTS) -o ../client/src/pb/pb.d.ts ../client/src/pb/pb.js

all: server client
