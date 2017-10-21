#! /bin/sh

shopt -s extglob

#clean old files
rm -rf  ../!(output)

#deploy
cp -r ./* ../

#rm deploy.sh
rm -rf ../deploy.sh


