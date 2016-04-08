<p align="center"><img src="docs/img/telavivjs.png" width=220></p>
<p align="center"><a href="https://github.com/facebook/react">React</a> Universal Rendering</p>
<p align="center"><a href="https://travis-ci.org/dustin-H/bauhaus-ui"><img src="https://travis-ci.org/dustin-H/bauhaus-ui.svg"/></a> <a href="https://codeclimate.com/github/dustin-H/bauhaus-ui"><img src="https://codeclimate.com/github/dustin-H/bauhaus-ui/badges/gpa.svg" /></a> <a href="https://www.npmjs.com/package/bauhaus-ui"><img src="https://badge.fury.io/js/bauhaus-ui.svg" alt="npm version" height="18"></a> <a href="https://gitter.im/dustin-H/bauhaus-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/dustin-H/bauhaus-ui.svg" alt="chat" height="18"></a></p>
<p align="center"><a href="https://github.com/dustin-H/bauhaus-ui/blob/master/docs/README.md">Docs</a> - <a href="https://github.com/dustin-H/bauhaus-ui/blob/master/docs/GetStarted.md">Get Started</a> - <a href="https://github.com/dustin-H/bauhaus-ui-example">Example</a> - <a href="https://github.com/dustin-H/bauhaus-ui#demo">Demo</a></p>



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

### How?

You define your web-application with a path to components-array mapping:

```js
{
  path: '/some/path',
  html5: [{
    component: 'Header'
  }, {
    component: 'Footer'
  }]
}
```

Every component can have a data-source, which will get fetched before rendering. The result gets passed as `props.data` to the component.

```js
{
  path: '/article/theme',
  html5: [{
    component: 'Article',
    data: {
      type: 'REST',
      url: '/api/article/theme'
    }
  }]
}
```

Parameters can also get passed.

```js
{
  path: '/article/:id',
  html5: [{
    component: 'Article',
    data: {
      type: 'REST',
      url: '/api/article/:id'
    }
  }]
}
```

Options which were set here will be passed as `props.options` to the component.

```js
{
  path: '/some/path',
  html5: [{
    component: 'Header',
    options: {
      some: 'data'
    }
  }]
}
```

By doing this TelAviv.js is able to fetch all required data from the API before rendering the React components.

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
  address: {
    api: 'http://localhost:8000/'
  }
}
```

## Contribute
We actively welcome pull requests.

## License
TELAVIV.JS is [MIT](https://github.com/dustin-H/telaviv/blob/master/LICENSE) licensed.

Created with ♥ by Dustin Hoffner.
