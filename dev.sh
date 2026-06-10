#!/bin/bash
export PATH="/Users/eyespice/.nvm/versions/node/v24.14.0/bin:$PATH"
cd "$(dirname "$0")"
exec npm run dev
