# Edumate API

This is Team 13's project for CSCI-P565/P-465 -- specifically the API endpoint portions.

## How to use linter - Eslint

The `.eslintrc.yml` file sets up the rules that Eslint will follow.

To lint one file: `npx eslint project-dir/ file1.js`

To lint the entire directory: `npx eslint .`

To lint AND fix: `npx eslint --fix <rest>`

## Running locally

```
1. rm package-lock.json (if applicable)
2. npm install
3. npm build -- to check if everything is in order
4. npm start
```

## Deployment to Heroku
### Prod
```
> cd /project
> heroku git:remote -a edumate
> git add .
> git commit -am "msg"
> git push heroku master
```

