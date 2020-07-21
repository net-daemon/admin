.DEFAULT_GOAL := help

help: ## Shows help message.
	@printf "\033[1m%s\033[36m %s\033[32m %s\033[0m \n\n" "Development environment for" "NetDaemon" "Admin";
	@awk 'BEGIN {FS = ":.*##";} /^[a-zA-Z_-]+:.*?##/ { printf " \033[36m make %-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST);
	@echo

init: bootstrap

start: bootstrap ## Start the frontend devserver
	@ yarn start;

bootstrap: ## Install dependencies
	@ yarn;

deploy: bootstrap ## Build the frontend
	@ yarn build;

run: deploy ## Run the frontend
	@ node host/admin.js;

run-dummy-dev: ## Run dummy dev-server
	@ node host/dev.js;

update: ## Pull main from net-daemon/admin
	@ git pull upstream master;
