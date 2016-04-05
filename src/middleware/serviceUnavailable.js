
export default function() {
  return (req, res, next) => {
    res.status(503).send('<html><body style="text-align: center; font-family: Helvetica; margin-top: 100px; font-size: 40px;">Service Unavailable<br/><br/><span style="font-size: 16px;">(ERROR 503)</span><br/><br/><span style="font-size: 16px;">Tel-Aviv.JS totally crashed!<br/><br/><img src="/.static/telaviv.png" width="80" alt="TelAviv.JS" /></span></body></html>')
  }
}
