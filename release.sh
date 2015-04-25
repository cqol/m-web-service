#!/bin/sh

dirname="m-web-service"
version=$1

# git
git checkout .
git pull

# npm
npm --registry=http://registry.npm.taobao.org --disturl=http://dist.u.qiniudn.com install
npm list

# zip
cd ..
zip -r ${dirname}-${version}.zip ./${dirname}
cd ${dirname}

npm list

# echo info
echo "success."
echo "version:"
echo ${version}

echo "branch :"
git branch

echo "node v :"
/usr/local/bin/node -v
