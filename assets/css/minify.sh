#!/bin/bash
curl -X POST -s --data-urlencode 'input@minima.css' https://cssminifier.com/raw > minima.min.css
