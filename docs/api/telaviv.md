
# TelAviv.js API Reference

Get the object:

```js
import telaviv, { setConfig } from 'telaviv'
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

### See also:
- [Config-Object](config.md)
