# Get Started

## Installation
```
npm install telaviv --save
npm install telaviv-build --save-dev
```

## API
First let's create a simple REST API using express.

```js
const express = require('express')
const app = express()

const posts = {
  post1: {text: 'This is the first Post!'},
  post2: {text: 'This is the second Post!'},
  post3: {text: 'This is the third Post!'}
}

app.get('/api/post/:id', (req, res) => {
  if(posts[req.params.id] == null){
    return res.status(404).send('Not found!')
  }
  res.json(posts[req.params.id])
})

app.listen(8080)
```

## Theme
To display this data we need some React components. This website will show a header with a menu and the text of a post.

This folder-structure is specified:

```
themes                  # Themes path
  myTheme               # The name of your theme
    Header              # Component name
      /index.js
    Menu
      index.js
    Post
      index.js
```

### `Header/index.js`
The header only displays some static text.

```js
import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <h1>My Blog</h1>
    )
  }
}

export default Header
```


### `Menu/index.js`
The menu component renders three static Links to the posts.

> The displayed href's (to) are not created yet!

```js
import React, { Component } from 'react'

class Menu extends Component {
  render() {
    const Link = this.context.telaviv.Link
    return (
      <div>
        <Link to="/posts/post1">Post1</Link>
        <Link to="/posts/post2">Post2</Link>
        <Link to="/posts/post3">Post3</Link>
      </div>
    )
  }
}

Menu.contextTypes = {telaviv: React.PropTypes.object}

export default Menu
```

### `Post/index.js`
Finally the post component shows the post-text in red.

```js
import React, { Component } from 'react'

class Post extends Component {
  render() {
    const {data} = this.props
    return (
      <div style={{color: 'red'}}>
        { data.text }
      </div>
    )
  }
}

export default Post
```

### Building the theme
Since the theme includes JSX and ES6 it needs to be build. TelAviv.js has a webpack config which builds your themes for the client- and server-side.

#### `webpack.config.js`
```js
var telaviv = require('telaviv-build').default

module.exports = telaviv('themes', 'build')
```

This will build all themes from `./themes` to `./build` if you install all peerDependencies of `telaviv-build` and run webpack.

## App
Let's add the TelAviv.js middleware to the express app.

```js
const telaviv = require('telaviv').default
const config = require('./config.json')

// Here the API

app.use(telaviv(config))
```

## Config and Routes
Finally we need to configure TelAviv.js:

```js
{
	"routes": [{
		"path": "/posts/:id",
		"html5": [{
			"component": "Header"
		}, {
			"component": "Menu"
		}, {
			"component": "Post",
			"data": {
				"type": "REST",
				"url": "/api/post/:id"
			}
		}]
	}],
	"theme": "myTheme",
	"apiAddress": "http://localhost:8080/"
}
```
