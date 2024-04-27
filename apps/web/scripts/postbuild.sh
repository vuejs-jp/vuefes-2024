#!/bin/bash

# 
# change dir structure
# ./dist/{html} -> ./dist/2024/{html}
# 
# if [ ! -d "./.output" ]; then
#     echo "can not find .output"
#     exit 1;
# fi

mkdir ./tmp
mv ./.output/* ./tmp
mkdir ./dist
mkdir ./dist/2024
mv ./tmp/* ./dist/2024
rm -rf ./tmp