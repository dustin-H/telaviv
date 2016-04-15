# Route API Reference
A `route` is an object which defines a path its content.

## Properties

Name     | Required | Type    | Default
-------- | -------- | ------- | -------
path     | true     | String  | -
internal | false    | Boolean | `false`
html5    | false    | String  | `[]`
amphtml  | false    | String  | `[]`

### `path`
The path of the route. Can include parameters.

```
/my/route
/post/:id
/:language/:postid
```

### `internal`
When true the route can only be used as internal error-route and is not reachable directly.

### `html5` / `amphtml`
These two properties are defining the content which will be rendered at this route. Both are arrays of **Component-to-DataSource** mappings.
- When the content gets defined only with `html5`, TelAviv.js will render normal HTML and continue client rendering.
- When the content gets defined only with `amphtml`, TelAviv.js will render [AMP HTML](https://github.com/ampproject/amphtml) and does not continue client rendering. All [required markup](https://www.ampproject.org/docs/reference/spec.html) will be included.
- When both properties are set, TelAviv.js will check if HTTP Query `req.query.amp === '1'`. If so the `amphtml` content gets rendered. Otherwise `html5`.

> The components used for rendering AMP HTML need to match the AMP HTML Pattern!

# Component-to-DataSource Mapping
A Component-to-DataSource mapping is a object defining a component and it's DataSource.

## Properties

Name      | Required | Type   | Default
--------- | -------- | ------ | -------
component | true     | String | -
options   | false    | Object | `{}`
data      | false    | Object | `null`

### `component`
The name of a component defined in your theme.

### `options`
A custom Object, which will be passed to the component as `this.props.options`.

You can pass route-parameters from `route.path` to this object like this:

```js
const options = {
  someParam: ':id'
}
```

### `data`
A object defining a DataSource which will get fetched before rendering. The result JSON will be passed to the component as `this.props.data`.

At the moment only REST-DataSources are available:

```js
const data = {
  type: 'REST',
  url: '/api/some/json/endpoint'
}
```

You can pass route-parameters from `route.path` to the url.

```js
const data = {
  type: 'REST',
  url: '/api/post/:id'
}
```

## Route example:

```js
{
  path: '/article/:id',
  html5: [{
    component: 'StaticHeader',
    options: {
      title: 'My Header!'
    }
  }, {
    component: 'Article',
    data: {
      type: 'REST',
      url: '/api/article/:id'
    }
  }]
}
```
