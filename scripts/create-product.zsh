#! /bin/zsh

source .env

declare name
declare price
declare image

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
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if [ -z "$name" || -z "$price" || -z "$image" ]; then
  echo "All fields are required"
  exit 1
fi

curl -X POST http://localhost:$SERVER_PORT/api/products \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$name\",
    \"price\": $price,
    \"image\": \"$image\"
  }"