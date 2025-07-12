.PHONY: clean

langs = $(patsubst resume.%.yml,dist/%/index.html,$(wildcard resume.*.yml))

default: dist/.nojekyll dist/img dist/index.html $(langs)

dist/.nojekyll: dist/.f
	touch dist/.nojekyll
dist/img: img
	cp -r img dist/img
dist/index.html: dist/.f
	cp index.html dist

dist/%/resume.json: resume.%.yml dist/%/.f
	bunx yaml2json $< > $@
dist/%/index.html : dist/%/resume.json
	node -e "const theme = require('./theme'); const resume = JSON.parse(require('fs').readFileSync('$<', 'utf8')); require('fs').writeFileSync('$@', theme.render(resume));"
	sed -i.bak s/lang=\"en\"/lang=\"$*\"/g $@
	rm $@.bak
	rm $(dir $@)resume.json $(dir $@).f

%/.f:
	mkdir -p $(dir $@)
	touch $@

clean:
	rm -rf dist