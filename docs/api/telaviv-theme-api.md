# TelAviv.js Theme API
You can access this API-object from the theme components.

```js
class Header extends Component {
  render() {
    let telaviv = this.context.telaviv
    return (
      <div></div>
    )
  }
}

Header.contextTypes = {telaviv: React.PropTypes.object}
```

## Universal
API-Properties that will be available on the client and the server.

### `Link`
This is a React-Component you should use to create Links.

#### props

Name            | Required | Type   | Description
--------------- | -------- | ------ | --------------------------------------------------------
to              | true     | String | A href to somewhere. Do not use relative URL's!
activeStyle     | false    | Object | Styles that will be applied when the link is active.
activeClassName | false    | String | ClassNames that will be applied when the link is active.

### `changeLocation(href, [statusCode = 302])`
On the client this will change the location by pushing into history and load the correct data. On the server this will cause a redirect with a certain `statusCode` or by default `302`.

### `setTitle(title)`
Sets the `<title>Title</title>` of your page.

### `isActive(href)`
Returns `true/false` when `href` is the current location.

### `IS_SERVER`
Is `true` when the current render-progress is on the server-side.

### `IS_CLIENT`
Is `true` when the current render-progress is on the client-side.

## Client-Only
API-Properties that will be available on the client.

### `reload()`
Will reload the current route. This will not cause a complete browser-reload! It's TelAviv.js internal.

### `isLoading()`
Returns `true/false` when TelAviv.js is currently loading a new route.

## Server-Only
API-Properties that will be available on the server.

### `addToHead(html)`
Adds `html` text to the HTML `<head></head>` before responding.
