SRC_DIR = src

JS_EXT        = *.js
JS_TEST_EXT   = *.test.js
JS_FILES      = $(shell find $(SRC_DIR)/js -type f -name '$(JS_EXT)')
JS_SRC_FILES  = $(shell find $(SRC_DIR)/js -type f -name '$(JS_EXT)' -not -name '$(JS_TEST_EXT)')
JS_TEST_FILES = $(shell find $(SRC_DIR)/js -type f -name '$(JS_TEST_EXT)')

jshint:
	@node_modules/.bin/jshint $(JS_FILES)

test: jshint
	@node_modules/.bin/mocha $(JS_TEST_FILES)

.PHONY: jshint test
