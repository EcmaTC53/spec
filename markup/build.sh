#!/bin/bash

rm -rf out
mkdir -p out

cp -R img/ out/img
node md2xml.js changes.md changes.xml
node md2xml.js main.md main.xml
