# :dog: Find My Dog

- This web application is made by Koa server provided with react.js as the frontend.
- Find my dog is a simple searching website that helps the users to get a picture of dog in a desired breed.
- Enjoy the relaxing puppy photos!

## Getting started

You will need to install Node.js.

For best results, use [Node.js 16 or higher](https://nodejs.org/).

To install all the dependencies, please run this command:
```
npm install
```

To start the server and run the web application, please run:
```
npm start
```

Things I implemented: 
* `Pubsub.js` for event handling
* `setupProxy.js` for fetching the API though the provided Koa server 
* `Ant Design` for better looking interface
* `Axios` for sending response


## Things that could be improved

1. If I have enough time I might implement the router and history so that the user would have a `/breed` path and all the pictures could be saved in the history, since the users may want to re-check the pictures that are fetched before.

2. Maybe implement a better looking gallery to show multiple pictures, since for now the response would be a large list of URLs, I don't want to spend extra memories to store and render that many URLs.