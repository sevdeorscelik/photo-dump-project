import express from 'express'

const app = express()
const port = 4000

app.get("/", (req, res) => {
    res.send('INDEX PAGE-3')
})

app.listen(port, () =>{
    console.log(`Application running on port : ${port}`);
})