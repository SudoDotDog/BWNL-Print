# Paths
tsconfig_build_path := typescript/tsconfig.build.json

# NPX functions
tsc := node_modules/.bin/tsc
start-storybook := node_modules/.bin/start-storybook
build-storybook := node_modules/.bin/build-storybook
mocha := node_modules/.bin/mocha
ts_node := node_modules/.bin/ts-node
eslint := node_modules/.bin/eslint

.IGNORE: clean-linux

main: run

run: 
	@echo "[INFO] Starting Storybook Environment"
	@NODE_ENV=development $(start-storybook)

story:
	@echo "[INFO] Building Storybook Page"
	@NODE_ENV=development $(build-storybook)

build:
	@echo "[INFO] Building for release"
	@NODE_ENV=production $(tsc) --p $(tsconfig_build_path)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test \
	$(mocha) --config test/.mocharc.json

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha) --config test/.mocharc.json

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

license: clean
	@echo "[INFO] Sign files"
	@NODE_ENV=development $(ts_node) script/license.ts

clean: clean-linux
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf build
	@rm -rf .nyc_output
	@rm -rf coverage
	@rm -rf storybook-static

publish: install lint tests license build
	@echo "[INFO] Publishing package"
	@cd app && npm publish --access=public

publish-dry-run: install lint tests license build
	@echo "[INFO] Publishing package"
	@cd app && npm publish --access=public --dry-run

ts-version:
	@echo "[INFO] Getting TypeScript Version"
	@NODE_ENV=development $(tsc) --version
