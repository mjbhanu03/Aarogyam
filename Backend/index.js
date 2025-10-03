import express from "express"

const PORT = 7000
const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
  console.log('Hello')
})

app.listen(PORT, ()=>{
  console.log('http://localhost:7000')
})