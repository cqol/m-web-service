#!/bin/sh

appname="m-web-service"
appdir="/home/app/nodejs/m-web-service"
logdir="/home/app/nodejs/logs"

node="${appdir}/bin/node"

if [ ! -d "$logdir" ]; then
  mkdir "$logdir"
fi

NODE_ENV=production $node --harmony ${appdir}/master.js &

exit 0
