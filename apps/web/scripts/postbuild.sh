#!/bin/bash

# 
# change dir structure
# ./dist/{html} -> ./dist/2024/{html}
# 
if [ ! -d "./dist" ]; then
    echo "can not find dist"
    exit 1;
fi

mkdir ./tmp
mv ./dist/* ./tmp
mkdir ./dist/2024
mv ./tmp/* ./dist/2024
rm -rf ./tmp