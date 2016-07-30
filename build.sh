#!/bin/bash
node generate-html.js
open -a firefox ./public/index.html
watchify public/js/client.js  -o public/js/bundle.js
