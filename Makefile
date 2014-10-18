BROWSERIFY     = node_modules/.bin/browserify
JSHINT         = node_modules/.bin/jshint
MOCHA          = node_modules/.bin/mocha-phantomjs

SRC_DIR        = src
DIST_DIR       = dist
TEST_DIR       = tests

JS_EXT         = *.js
JS_TEST_EXT    = *.test.js
JS_FILES       = $(shell find $(SRC_DIR)/js -type f -name '$(JS_EXT)')
JS_SRC_FILES   = $(shell find $(SRC_DIR)/js -type f -name '$(JS_EXT)' -not -name '$(JS_TEST_EXT)')
JS_TEST_FILES  = $(shell find $(SRC_DIR)/js -type f -name '$(JS_TEST_EXT)')

JS_TEST_BUNDLE = $(DIST_DIR)/tests.js
TEST_RUNNER    = $(TEST_DIR)/runner.html

jshint:
	@$(JSHINT) $(JS_FILES)

$(JS_TEST_BUNDLE): $(JS_FILES)
	@$(BROWSERIFY) $(JS_TEST_FILES) -o $(JS_TEST_BUNDLE)

test: jshint $(JS_TEST_BUNDLE)
	@$(MOCHA) $(TEST_RUNNER)

.PHONY: jshint test
