
echo Formatting
yarn workspace @mtd/client prettier:check
yarn workspace @mtd/server prettier:check

echo Linting
yarn workspace @mtd/client lint
yarn workspace @mtd/server lint
