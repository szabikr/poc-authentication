all:
	cd packages/client; \
	ls; \
	yarn run prettier:check; \
	yarn run lint; \
	yarn run test; \

