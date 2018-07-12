TESTS = test/unit/*.js
REPORTER = spec
install:
	@npm install 
	@./node_modules/pegjs/bin/pegjs -o ./lib/parse.js ./peg/sqlparser.pegjs
test: install
	@./node_modules/mocha/bin/mocha -r should $(TESTS) --reporter spec

clean:
	rm -rf ./node_modules

.PHONY: test
