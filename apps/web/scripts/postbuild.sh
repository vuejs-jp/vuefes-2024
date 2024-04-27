#!/bin/bash

# 
# change dir structure
# ./dist/{html} -> ./dist/2024/{html}
mkdir ./dist
if [ ! -d "./.nuxt/dist" ]; then
    echo "can not find .nuxt/dist"
    exit 1;
fi

mkdir ./tmp
mv ./.nuxt/dist/* ./tmp
mkdir ./dist/2024
mv ./tmp/* ./dist/2024
rm -rf ./tmp