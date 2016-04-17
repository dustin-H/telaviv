<p align="center"><img src="docs/img/telavivjs.png" width=220></p>
<p align="center"><a href="https://github.com/facebook/react">React</a> Universal Rendering</p>
<p align="center"><a href="https://travis-ci.org/dustin-H/telaviv"><img src="https://travis-ci.org/dustin-H/telaviv.svg"/></a>&nbsp;<a href="https://codeclimate.com/github/dustin-H/telaviv"><img src="https://codeclimate.com/github/dustin-H/telaviv/badges/gpa.svg" /></a>&nbsp;<a href="https://codeclimate.com/github/dustin-H/telaviv/coverage"><img src="https://codeclimate.com/github/dustin-H/telaviv/badges/coverage.svg" /></a></p>
<p align="center"><a href="https://github.com/dustin-H/telaviv/blob/master/docs/README.md">Docs</a> - <a href="https://github.com/dustin-H/telaviv/blob/master/docs/GetStarted.md">Get Started</a></p>

<br/>

## Features
- **Universal React:**   
Renders your components on the server-side and continues rendering on the client-side
- **HTML5 and AMPHTML:**  
Supports normal HTML5 web-applications and mobile-optimised AMPHTML.

## Idea
The main idea for TelAviv.js is to render a React app initially on a Node.js server and continue further rendering in the user's browser. The next route changes will only request data from the API.

### Why?
This concept combines the benefits of server rendering and client rendering:

1. **Search Engine optimized:**  
The TelAviv.js server fetches all data from your `REST-API` before responding. So crawlers are able to index all your pages.
2. **Fast initial load:**  
The TelAviv.js server renders static `html` markup including the minimal set of `css`. All JavaScript code gets loaded asynchronous.
3. **Minimal server traffic:**  
After the JavaScript code was loaded, the TelAviv.js script handles all route changes and only loads data from the API, which relieves the server.

## Installation
```
npm install telaviv --save
```

## Usage
Basically TelAviv.js is a express middleware.

```js
import telaviv from 'telaviv'
import express from 'express'
import config from 'config.js'

let app = express()

app.use(telaviv(config))

app.listen(8080)
```

### `config.js`
```js
export default {
  routes: [{
    path: '/article/:id',
    html5: [{
      component: 'Header'
    }, {
      component: 'Article',
      data: {
        type: 'REST',
        url: '/api/article/:id'
      }
    }, {
      component: 'Footer'
    }]
  }],
  apiAddress: 'http://localhost:8000/'
}
```

## Contribute
We actively welcome pull requests.

## License
TELAVIV.JS is [MIT](https://github.com/dustin-H/telaviv/blob/master/LICENSE) licensed.

Created with ♥ by Dustin Hoffner.
