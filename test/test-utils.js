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
          redirect:{
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
