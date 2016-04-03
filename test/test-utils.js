import fetchApi from './fetchApi.js'
export { fetchApi };

export function mockInitConfig(ownAddress) {
  return {address: {own: ownAddress}}
}
export function mockRouterConfig(pathname, component) {
  return {
    routes: [{
      path: pathname,
      html5: [{
        component: component
      }]
    }]
  }
}
export function mockRequestForRouteTypeParser(canonical, html5, amphtml, redirect, amp) {
  let req = {
    bauhaus: {
      route: {
        route: {}
      },
      canonical: canonical
    },
    query: {}
  }
  if (redirect === true) {
    req.bauhaus.route.route.redirect = redirect
  }
  if (html5 === true) {
    req.bauhaus.route.route.html5 = html5
  }
  if (amphtml === true) {
    req.bauhaus.route.route.amphtml = amphtml
  }
  if (amp === true) {
    req.query.amp = 1
  }
  return req
}
export function mockRequestForRedirect(type, url, code) {
  let req = {
    bauhaus: {
      type: type,
      route: {
        route: {
          redirect: {
            url: url
          }
        }
      }
    }
  }
  if (code != null) {
    req.bauhaus.route.route.redirect.code = code
  }
  return req
}
export function mockRequestForPrepareRouteFetch(type, components, params) {
  let req = {
    bauhaus: {
      type: type,
      route: {
        params: params,
        route: {}
      }
    }
  }
  req.bauhaus.route.route[type] = components
  return req
}
export function mockRequestForPrepareErrorFetch(type) {
  let req = {bauhaus: {type: type}}
  return req
}
export function mockResponseForPrepareErrorFetch(code) {
  let res = {
    status: (code) => {
      res.statusCode = code
    },
    statusCode: code
  }
  return res
}
export function mockConfigForPrepareErrorFetch(component) {
  return {
    routes: [{
      path: '/error/:code',
      html5: [{
        component: component
      }]
    }],
    errors: [{
      from: 404,
      to: 404,
      path: '/error/:code'
    }, {
      from: 500,
      to: 500,
      path: '/errors/:code'
    }]
  }
}
export function mockRenderReactConfig() {
  return {
    clientRoutes: [],
    components: {
      Active: 'active-',
      Data: 'data-',
      Header: 'header-',
      Link: 'link-',
      Redirect: 'redirect-',
      RedirectWithCode: 'redirect-with-code-',
      StylesBlue: 'styles-blue-',
      StylesRed: 'styles-red-',
      Title: 'title-'
    },
    theme: 'test',
    staticMarkup: true
  }
}
