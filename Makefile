BROWSERIFY         = node_modules/.bin/browserify
ISTANBUL           = node_modules/.bin/istanbul
JSHINT             = node_modules/.bin/jshint
MOCHA              = node_modules/.bin/mocha-phantomjs
PLATO              = node_modules/.bin/plato

SRC_DIR            = src
DIST_DIR           = dist
TEST_DIR           = tests
REPORTS_DIR        = reports

JS_EXT             = *.js
JS_TEST_EXT        = *.test.js
JS_DIR             = $(SRC_DIR)/js
JS_FILES           = $(shell find $(JS_DIR) -type f -name '$(JS_EXT)')
JS_SRC_FILES       = $(shell find $(JS_DIR) -type f -name '$(JS_EXT)' -not -name '$(JS_TEST_EXT)')
JS_TEST_FILES      = $(shell find $(JS_DIR) -type f -name '$(JS_TEST_EXT)')

JSHINT_CONFIG      = .jshintrc

JS_TEST_BUNDLE     = $(DIST_DIR)/tests.js
TEST_RUNNER        = $(TEST_DIR)/runner.html

COV_DIR            = $(DIST_DIR)/coverage
COV_JS_DIR         = $(COV_DIR)/$(SRC_DIR)/js
COV_JS_TEST_FILES  = $(shell find $(COV_JS_DIR) -type f -name '$(JS_TEST_EXT)')
COV_JS_TEST_BUNDLE = $(COV_DIST_DIR)/tests.js
COV_TEST_RUNNER    = $(COV_DIR)/$(TEST_DIR)/runner.html
COV_DIST_DIR       = $(COV_DIR)/$(DIST_DIR)

PLATO_DIR          = $(REPORTS_DIR)/plato

# Directories

$(DIST_DIR):
	@mkdir -p $(DIST_DIR)

$(COV_DIR):
	@mkdir -p $(COV_DIR)

$(COV_JS_DIR):
	@mkdir -p $(COV_JS_DIR)

$(COV_DIST_DIR):
	@mkdir -p $(COV_DIST_DIR)

# Tests

jshint:
	@$(JSHINT) $(JS_FILES)

$(JS_TEST_BUNDLE): $(JS_FILES) $(DIST_DIR)
	@$(BROWSERIFY) $(JS_TEST_FILES) -o $(JS_TEST_BUNDLE)

test: jshint $(JS_TEST_BUNDLE)
	@$(MOCHA) $(TEST_RUNNER)

# Test Coverage

$(COV_TEST_RUNNER): $(COV_DIR)
	@mkdir -p $(COV_DIR)/$(TEST_DIR)
	@sed -e 's|\.\./node_modules|\.\./\.\./\.\./node_modules|g' $(TEST_RUNNER) > $(COV_TEST_RUNNER)

$(COV_DIR)/index.html: $(JS_FILES) $(COV_TEST_RUNNER) $(COV_JS_DIR)
	@cp -R $(JS_DIR)/ $(COV_JS_DIR)
	@$(ISTANBUL) instrument --output $(COV_JS_DIR) -x $(JS_TEST_EXT) $(JS_DIR)
	@$(BROWSERIFY) $(COV_JS_TEST_FILES) -o $(COV_JS_TEST_BUNDLE)
	@$(MOCHA) $(COV_TEST_RUNNER) -k $(TEST_DIR)/mocha-coverage-hook.js
	@$(ISTANBUL) report --dir $(COV_DIR) html --include=$(COV_DIR)/coverage.json

coverage: $(COV_DIR)/index.html

# Plato

$(PLATO_DIR): $(JS_SRC_FILES) $(JSHINT_CONFIG)
	@$(PLATO) -q -l $(JSHINT_CONFIG) -d $(PLATO_DIR) $(JS_SRC_FILES)

plato: $(PLATO_DIR)

.PHONY: jshint test coverage plato
