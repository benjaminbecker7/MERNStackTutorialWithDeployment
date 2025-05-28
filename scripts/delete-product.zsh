#! /bin/zsh

source .env

if [ -z "$1" ]; then
  echo "Usage: $0 <product_id>"
  exit 1
fi

curl -X DELETE http://localhost:$SERVER_PORT/api/products/$1