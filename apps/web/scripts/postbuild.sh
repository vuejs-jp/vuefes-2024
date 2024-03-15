#!/bin/bash

if [ ! -d "./.output" ]; then
    echo "can not find .output"
    exit 1;
fi

mv ./.output/public ./.output/2024
mkdir ./.output/public
mv ./.output/2024 ./.output/public/