
# TelAviv.js API Reference

Get the object:

```js
import telaviv, { setConfig, clearModuleCache } from 'telaviv'
```

## `telaviv(config)`

Returns a the express middleware. Responds to every request.

```js
app.use(telaviv(config))
```

## `setConfig(config)`

Changes the [config](config.md) on runtime.

```js
setConfig(config)
```

## `clearModuleCache()`

Deletes all theme modules from node's `require.cache`. So you can update components on runtime.

```js
clearModuleCache()
```

### See also:
- [Config-Object](config.md)
