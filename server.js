import http from 'http'
import express from 'express'

const HTTP_PORT = 3080

const app = express()
app.use(express.json())

app.post('/api', (req, res) => {
  console.log("API REQUEST: ", JSON.stringify(req.body))
  res.json(req.body)
})

app.post('/state', (req, res) => {
  console.log("STATE CHANGE REQUEST: ", JSON.stringify(req.body))
  res.json('ok')
})

http.createServer(app).listen(HTTP_PORT, function() {
  console.log('http server listening on port ' + HTTP_PORT)
})
