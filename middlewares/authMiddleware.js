import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'




const authenticateToken = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.redirect("/login") //login olamiyorsan login sayfasina git
                } else{
                    next()  //hata yoksa devam et, mereye gitmen gerekiyorsa
                }
            })
        } else {
            res.redirect('/login')  //token yoksa da login'e git
        }

    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: 'Not authorized'

        })
    }

}

export { authenticateToken }