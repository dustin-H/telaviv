# DataSource

Describes an API-endpoint where data can be loaded.

## Format
```js
{
  /**
   * The name of the DataSource for identification (needs to be uniq)
   */
  name: 'MySource',
  /**
   * A object of param-names having functions as values
   */
  params: {
    /**
     * A Promise returning function
     * Resolves possible values with a human readable text
     */
    _id: function getPossibleValues() {
      return new Promise(function(resolve, reject) {
        resolve({
          firstId: 'Erster Artikel',
          secondId: 'Zweiter Artikel'
        })
      })
    }
  },
  /**
   * A sync function that returns a api-url (maybe later with graphql query)
   * @param {Object} params - a set of params with their values inside
   */
  getSource: function(params) {
    return '/api/v1/getSource'
  },
  /**
   * A Promise returning function
   * Resolves wether the user can access this endpoint or not
   * @param {Object} req - the express req object
   */
  canUserAccess(req) {
    return new Promise(function(resolve, reject) {
      resolve(true)
    })
  }
}
```
