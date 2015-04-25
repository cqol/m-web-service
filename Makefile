TESTS = test/**/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =

PRO = ~/dev/m-web-service
MPRO = ~/gitlab/tts-mobile
HBS = ~/gitlab/tts-mobile/hbs

test:
	@NODE_ENV=develop ./node_modules/mocha/bin/mocha --harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require co-mocha \
		--slow 50 \
		$(MOCHA_OPTS) \
		$(TESTS)

fmt:
	@js-beautify -r *.js *.json \
		api/*.js \
		common/*.js \
		config/*.js \
		db/*.js \
		model/*.js \
		service/*.js \
		util/*.js \
		test/**/*.js

copy:
	cd $(MPRO) && git checkout dist && git pull # `cd` only works for current line
	cp $(HBS)/*.hbs ./hbs/
	cp $(HBS)/shared/*.hbs ./hbs/shared/
	cp $(MPRO)/cache.manifest ./static
	@echo "copy dist branch finished"
	./manifest-unique.js
.PHONY: test
