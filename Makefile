TESTS = test/**/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =

PRO = ~/dev/m-web-service
MPRO = ~/gitlab/tts-mobile
HBS = ~/gitlab/tts-mobile/hbs
HBS2 = ~/dev/tts-mobile/hd/hbs
STATIC = ~/dev/tts-mobile/tts-mobile-static/dist
HBS_REBUILD = ~/dev/tts-mobile/tts-mobile/app

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
# 贱马的 xx
copy-hd:
	cd $(HBS2)/.. && git checkout dist && git pull
	cp $(HBS2)/*.hbs ./hbs/
	@echo "copy 贱马的 hd, finished"

copy-r:
	cd $(MPRO) && git checkout rebuild && git pull # `cd` only works for current line
	cp $(HBS_REBUILD)/hbs/*.hbs ./hbs/
	cp $(HBS_REBUILD)/hbs/shared/*.hbs ./hbs/shared/
	echo "copy rebuild branch finished"
# STATIC
copy-static:
	cd $(STATIC) && git pull
	cp $(STATIC)/miaosha.html ./static

.PHONY: test
