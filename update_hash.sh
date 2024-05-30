sed -i -E "s/main\.js\?r=[0-9,a-f]+/main.js?r=$(md5sum docs/main.js | cut -c1-10)/g" docs/index.html
sed -i -E "s/custom\.css\?r=[0-9,a-f]+/custom.css?r=$(md5sum docs/custom.css | cut -c1-10)/g" docs/index.html
