#!/usr/bin/python

import sys
import httplib, urllib
import subprocess
import re

SCREEN_WIDTH=200

# Open the uncompressed file
print "Getting uncompressed file..."
f = open("../parts/uncompressed.js","r")
uncompressed = f.read()
f.close()

# Compress the code using Google's Closure Compiler with RESTful API (this is taken from https://developers.google.com/closure/compiler/docs/api-tutorial1)
print "Compressing using the closure compiler..."
params = urllib.urlencode([
	("js_code", uncompressed),
	("compilation_level", "WHITESPACE_ONLY"),
	("output_format", "text"),
	("output_info", "compiled_code"),
])
headers = { "Content-type": "application/x-www-form-urlencoded" }
c = httplib.HTTPConnection("closure-compiler.appspot.com")
c.request("POST", "/compile", params, headers)
response = c.getresponse()
compressed = response.read()
c.close()

# Remove any newlines
compressed = compressed.replace("\n","")

# Wrap the text
print "Wrapping text..."
wrapped = "\n".join([compressed[i:i+SCREEN_WIDTH] for i in range(0,len(compressed),SCREEN_WIDTH)])

# Highlight the text
print "Highlighting syntax..."
escaped = wrapped.replace("\\","\\\\").replace("\"","\\\"").replace("\n","\\n")
highlighted = subprocess.check_output(["nodejs","-e","h=require(\"highlight.js\");console.log(h.highlight(\"javascript\",\""+escaped+"\",true).value)"])

# Escape backshlashes for the regex engine
highlighted = highlighted.replace("\\","\\\\")

# Put the highlighted code in the HTML file
print "Saving to the HTML file..."
f = open("../index.html","r+")
html = f.read()
new_html = re.sub("<pre id=\"n\">.*</pre>",'<pre id="n">'+highlighted+'</pre>',html,flags=re.S|re.M)
f.seek(0)
f.write(new_html)
f.truncate()
f.close()

print "Done."
