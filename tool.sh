#!/bin/bash

DIR=`pwd`
CMD="node"
DEST="${DIR}/master.js"

ACTION=$1

usage() {
  echo "usage: ./tool.sh {start|stop|restart|status|update}"
  exit 1;
}

get_pid() {
  # todo: awk not works on osx
  PID=`ps ax | grep ${CMD} | grep ${DEST} | awk '{print $1}'`
}

start() {
  get_pid

  if [ -z $PID ]; then
    echo "starting"
    DEBUG=m-web-service* $CMD --harmony $DEST 2>&1 &
    get_pid
    echo "start success. pid=${PID}"
  else
    echo "already running. pid=${PID}"
  fi
}

stop() {
  get_pid

  if [ -z $PID ]; then
    echo "not running"
  else
    kill -15 $PID
    echo "stopped"
  fi
}

restart() {
  update
  stop
  sleep 0.5
  echo =====
  start
}

status() {
  get_pid

  if [ ! -z $PID ]; then
    echo "process pid: ${PID}"
  else
    echo "not running"
  fi
  exit 0;
}

update() {
  echo "update ..."

  git checkout .
  git pull

  NPM_RESULT=`npm list`

  if [ $? == "0" ]; then
    echo "~~~"
  else
    # update
    echo "npm install"
    npm install --registry=http://registry.npm.taobao.org
  fi

  echo ">_< 更新完毕"
}

case "$ACTION" in
  start)
    start
  ;;
  stop)
    stop
  ;;
  restart)
    restart
  ;;
  status)
    status
  ;;
  update)
    update
  ;;
  *)
    usage
  ;;
esac
