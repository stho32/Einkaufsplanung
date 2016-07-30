#!/bin/bash
browserify public/js/client.js  -o public/js/bundle.js
node generate-html.js
open -a firefox ./public/index.html
