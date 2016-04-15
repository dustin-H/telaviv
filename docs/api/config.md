# Config API Reference
`config` is an object which gets passed to [telaviv](telaviv.md).

## Properties

Name               | Required | Type   | Default
------------------ | -------- | ------ | ---------------------
routes             | false    | Array  | `[]`
errors             | false    | Array  | `[]`
theme              | false    | String | `'default'`
apiAddress         | false    | String | `'http://localhost/'`
staticCacheControl | false    | String | `'max-age=60'`
buildPath          | false    | String | `'build'`

### `routes`
This is an array of Routes. When recieving a request telaviv will walk through all routes and tries to match the path.

[Route](route.md) describes one element in this array.

### `errors`
This is an array of HTTP StatusCode to Error-Route mappings.

```js
config.errors = [{
  from: 400,
  to: 499,
  path: '/my/error/route/:code'
}]
```

This catches all 4xx HTTP Errors and renders the path from `routes`. `:code` gets replaced by the StatusCode.

### `theme`
A name of a theme which gets used for rendering. This can't be changed with [setConfig](telaviv.md#setConfig) on runtime.

### `apiAddress`
Defines the URL of your API-Server.

### `staticCacheControl`
When a route only serves static components the default HTTP Cache-Control-Header will be set.

### `buildPath`
The destination path of the themes build.
