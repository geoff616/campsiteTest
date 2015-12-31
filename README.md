First pass at building a UI for the campsite database described here: https://github.com/FreeCodeCamp/FreeCodeCamp/issues/5358

Currently, this runs as a standalone app: https://campsite-test-geoff616.c9users.io/

##To Install
Clone the repo locally, `npm install` and add the following to an `.env` file: 
```

GITHUB_KEY=############### //replace with github key
GITHUB_SECRET= ##################### //replace with github secret
MONGO_URI=mongodb://localhost:27017/campsitesdb
PORT=8080
APP_URL=http://######.com //replace with your app URL

```

##To Run 
```
mongod
node server.js //in a seperate terminal window
```
