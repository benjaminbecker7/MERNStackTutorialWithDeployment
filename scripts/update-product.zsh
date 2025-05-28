#! /bin/zsh

source .env

declare name
declare price
declare image
declare id

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --name)
      name="$2"
      shift 2
      ;;
    --price)
      price="$2"
      shift 2
      ;;
    --image)
      image="$2"
      shift 2
      ;;
    *)
      id="$1"
      shift 1
      ;;
  esac
done

if [ -z "$id" ]; then
  echo "Product ID is required"
  exit 1
fi

# Build JSON payload dynamically
json_payload="{"
if [[ -n "$name" ]]; then
  json_payload+="\"name\": \"$name\","
fi
if [[ -n "$price" ]]; then
  json_payload+="\"price\": $price,"
fi
if [[ -n "$image" ]]; then
  json_payload+="\"image\": \"$image\","
fi

# Remove trailing comma if exists
json_payload=${json_payload%,}
json_payload+="}"

curl -X PUT http://localhost:$SERVER_PORT/api/products/$id \
  -H "Content-Type: application/json" \
  -d "$json_payload"