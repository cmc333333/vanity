#!/bin/sh 
set -euo pipefail

FILENAME=/etc/nginx/conf.d/default.conf

if [ -n "$SERVER_NAME" ]; then
  sed "s/SERVER_NAME/$SERVER_NAME/g" /etc/nginx-conf/https.conf > $FILENAME
else
  cp /etc/nginx-conf/http-only.conf $FILENAME
fi

nginx -g "daemon off;"
