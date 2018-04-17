#!/bin/sh 
set -euo pipefail

while [ -d /etc/letsencrypt/live/ ]
do
  certbot renew
  sleep 4h
done
