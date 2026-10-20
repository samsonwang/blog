#!/bin/bash
set -e
# 亮色主题
sass sass/minima.scss css/minima.css
sass sass/minima.scss css/minima.min.css --style=compressed
# 暗色主题（皮肤见 sass/minima/skins/dark.scss）
sass sass/minima-dark.scss css/minima-dark.css
sass sass/minima-dark.scss css/minima-dark.min.css --style=compressed
# curl -X POST -s --data-urlencode 'input@css/minima.css' https://cssminifier.com/raw > css/minima.min.css
