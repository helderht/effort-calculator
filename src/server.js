const dotenv = require("dotenv").config()

const express = require("express")
const path = require("path")
const history = require("connect-history-api-fallback")

const app = express()
app
  .set("port", process.env.PORT || 3000)
  .use(express.static(path.join(__dirname, "/public")))
  .use(history)
  .listen(app.get("port"))
