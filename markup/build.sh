#!/bin/bash
node md2xml.js changes.md changes.xml
node md2xml.js main.md main.xml
# node md2xml.js annex.md annex.xml
cat header.xml > ECMA-419.xml
cat changes.xml >> ECMA-419.xml
cat main.xml >> ECMA-419.xml
cat annex.xml >> ECMA-419.xml
cat footer.xml >> ECMA-419.xml
ecmarkup ECMA-419.xml ECMA-419.html --lint-spec

