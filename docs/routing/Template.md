# Template

Describes pre and post content which can be wrapped around specified route content.

## Format
```js
{
  /**
   * The name of the template for identification (needs to be uniq)
   */
  name: 'HeaderAndFooterTemplate',
  /**
   * An array of content-objects
   */
  preContent: [{
    /**
     * The name of the frontend React component which displayes the data
     */
    component: 'Header',
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
      name: 'MyHeaderSource',
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
   * The name of the template for identification (needs to be uniq)
   */
  postContent: [{
    /**
     * The name of the frontend React component which displayes the data
     */
    component: 'Footer',
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
      name: 'MyHeaderSource',
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
  }]
}
```
