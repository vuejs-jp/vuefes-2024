#!/bin/bash

# 
# change dir structure
# ./.output/public/{html} -> ./.output/public/2024/{html}
# 
if [ ! -d "./.output" ]; then
    echo "can not find .output"
    exit 1;
fi

mv ./.output/public ./.output/2024
mkdir ./.output/public
mv ./.output/2024 ./.output/public/