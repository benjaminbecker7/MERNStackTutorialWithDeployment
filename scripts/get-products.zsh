#! /bin/zsh

source .env

curl http://localhost:$SERVER_PORT/api/products && echo