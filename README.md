## Get started to development

1. Run `npm install` after cloning the repository.
2. Make sure you have an available mongodb instance either a mongodb in local machine or in [Atlas](https://www.mongodb.com/).
3. Duplicate a file from `./config.env.sample`, fill in the values that fit your need.

## Deploy to Heroku

1. Download and install heroku cli, see [here](https://devcenter.heroku.com/articles/heroku-cli).
2. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key. `heroku login`
3. Add heroku as a remote repository if you haven't. `git remote add heroku https://git.heroku.com/gamingevents-api.git`.
4. Push to heroku. `git push heroku master`
