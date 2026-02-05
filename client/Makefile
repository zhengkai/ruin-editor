SHELL:=/bin/bash

dev:
	./node_modules/vite/bin/vite.js --host ruin.anna.9farm.com --port 22706 --strictPort

pb:
	./node_modules/protobufjs-cli/bin/pbjs -t static-module -w es6 --es6 --force-number -o src/pb/pb.js /www/ruin/proto/*.proto
	./node_modules/protobufjs-cli/bin/pbts -o src/pb/pb.d.ts src/pb/pb.js

build:
	./node_modules/vite/bin/vite.js build --outDir dist --base /ruin-editor/
