# MenuElement

Describes a Menu-Element for frontend-menus with their links.

## Format
```js
{
  /**
   * The name of the MenuElement which gets shown as label (TODO: Think about i18n)
   */
  name: 'Post about something',
  /**
   * The depth of this MenuElement inside the menu hierarchy
   */
  depth: 0,
  /**
   * The type of the MenuElement (route/url)
   */
  type: 'route',
  /**
   * In case of `type === 'route'`
   * `data` is an object containing `_id` (string) and `params` (object)
   */
  data: {
    /**
     * The _id of a Route
     */
    _id: 'myRouteId',
    /**
     * An object of params to map the route-parameters to a certain value
     */
    params: {
      id: 'postAboutSomethingId'
    }
  },
  /**
   * In case of `type === 'url'`
   * `data` is a string containing an url which will be in the link
   */
  data: '/some/static/url'
}
```
