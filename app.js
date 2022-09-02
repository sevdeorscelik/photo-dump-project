import express from "express"
import dotenv from 'dotenv'
import conn from './db.js'
import cookieParser from 'cookie-parser'
import pageRoute from './routes/pageRoute.js'
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
import {checkUser} from "./middlewares/authMiddleware.js";
import fileUpload from 'express-fileupload'
import { v2 as cloudinary} from 'cloudinary'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//connection to the db
conn()

const app = express()
const port = process.env.PORT


//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json()) //body'de gönderdimiz json formatindaki verilerin okunabilmesi icin
app.use(express.urlencoded({ extended: true })) //body'den gelen verilerin okunmasi icin bu middleware'i ekliyoruz..
app.use(cookieParser())
app.use(fileUpload({useTempFiles: true})) //cloudinary yükledigim görseller icin gecici bir tmp dosyasi olustururuz




//routes
app.use("*", checkUser) //tüm get/post methodlarinda user'i (checkUser fonksionunu) check etmemiz lazim. 
app.use("/", pageRoute); //slashà istek geldiginde pageRoute'a git demek
app.use("/photos", photoRoute); 
app.use("/users", userRoute); 

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