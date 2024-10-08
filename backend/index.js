const express = require("express")
const app = express()
const port = 3000
const cors = require('cors')

const fileRoutes = require("./routes/route.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api", fileRoutes)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})