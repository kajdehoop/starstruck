# Starstruck

In this web app you can create playlists, search artists and add their songs to your playlists. The app is connected to the Spotify API to collect cover art and play previews of songs. Your playlists are saved in local storage. Enjoy! :)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# install json-server
$ npm install -g json-server

# start json-server at localhost:3001 (use db.json as input for the local database)
$ json-server --watch db.json --port 3001
```

Live website deployed on [Netlify](https://starstruck.netlify.app) using a fallback josn database.

### Known bugs
If an item in the navbar is clicked twice in a row, an error will be thrown. This has probably to do with NuxtLink routing to the same route twice.
