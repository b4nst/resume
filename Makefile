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
	npx yaml2json $< > $@
dist/%/index.html : dist/%/resume.json
	cd $(dir $@) && npx resume export $(notdir $@) --theme elegant
	sed -i '' s/lang=\"en\"/lang=\"$*\"/g $@

%/.f:
	mkdir -p $(dir $@)
	touch $@

clean:
	rm -rf dist