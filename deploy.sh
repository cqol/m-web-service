#!/bin/sh

appname="m-chaoji99-service"
appdir="/home/app/nodejs/m-chaoji99-service"
logdir="/home/app/nodejs/logs"

node="${appdir}/bin/node"

if [ ! -d "$logdir" ]; then
  mkdir "$logdir"
fi

NODE_ENV=production $node --harmony ${appdir}/master.js &

exit 0
