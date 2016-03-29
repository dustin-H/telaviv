
export default (route) => {
  var components = []
  for (var i in route.html5) {
    components.push(route.html5[i].component)
  }
  return components
}
