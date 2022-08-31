import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null 
                next()
            } else {
                const user =await User.findById(decodedToken.userId) //usercontrollerde creatToken fonksiyonune userId fonksiyonunu verdgimiz icin o sekilde cagirmmaiz lazim
                res.locals.user = user;
                next()
            }
        } )
    } else { //token yoksa localde kullanici yok anlamina gelir
        res.locals.user = null;
        next();

    }
}


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

export { authenticateToken, checkUser }