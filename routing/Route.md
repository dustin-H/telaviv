# Route

Describes the content which gets displayed on a certain path.

## Format
```js
{
  /**
   * Some kind of id
   */
  _id: 'myRouteId',
  /**
   * A name, that describes what the route is made for
   */
  name: 'Get a PostEntry by :id',
  /**
   * The path to match
   */
  path: '/posts/:id',
  /**
   * The type of the route (redirect/content)
   */
  type: 'content',
  /**
   * In case of `type === 'redirect'`
   * `data` is an object containing `url` and `code`
   */
  data: {
    /**
     * The redirect url
     */
    url: '/api/redirect/to',
    /**
     * HTTP-Status Code which will be returned if possible
     */
    code: 301
  },
  /**
   * In case of type `type === 'content'`
   * `data` is an array of content-objects
   */
  data: [{
    /**
     * The name of the frontend React component which displayes the data
     */
    component: 'PostEntry',
    /**
     * The type of data provider (source/url)
     */
    type: 'source',
    /**
     * In case of `type === 'source'`
     * `data` is an object containing `name` String and `params` Object
     */
    data: {
      /**
       * The name of the DataSource which shall be used
       */
      name: 'MySource',
      /**
       * An object of params defined by DataSoure.params
       * params can have static values or a route-parameter in it like `:id`
       */
      params: {
        _id: ':id'
      }
    },
    /**
     * In case of `type === 'url'`
     * `data` is a string containing an url where the data shall get loaded
     * It can contain route-parameters like `:id`
     */
    data: '/api/my/data/url/:id'
  }],
  /**
   * An array of Strings
   * Defining Template names, which will be added to the `data` array.
   * NOTE: This only works if `type === 'content'`
   */
  templates: ['HeaderAndFooterTemplate']
}
```
