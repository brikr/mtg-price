#!/bin/bash

cd `dirname $0`

cd server && nodemon server.js &
cd app && ionic serve
