import express from "express"
import dotenv from 'dotenv'
import conn from './db.js'
import pageRoute from './routes/pageRoute.js'
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"

dotenv.config();


//connection to the db
conn()

const app = express()
const port = process.env.PORT


//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json()) //body'de gönderdimiz json formatindaki verilerin okunabilmesi icin


//routes
app.use("/", pageRoute); //slashà istek geldiginde pageRoute'a git demek
app.use("/photos", photoRoute); 
app.use("/register", userRoute); 

/*
//artik buna gerek yok

    app.get("/", (req, res) => {
        res.render('index')
    })

    app.get("/about", (req, res) => {
        res.render('about')
    })

*/

app.listen(port, () =>{
    console.log(`App running on port: ${port}`);
})