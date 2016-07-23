#!/bin/bash
browserify public/js/client.js  -o public/js/bundle.js
open -a firefox http://localhost:8080
node app.js
