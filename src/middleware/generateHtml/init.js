
export default (config) => {
  return (req, res, next) => {
    let data = req.telaviv.renderData || {}

    data.head = data.head || ''
    data.links = data.links || ''
    data.title = data.title || config.title || 'No Title!'

    return data
  }
}
