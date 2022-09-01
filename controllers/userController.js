import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user: user._id})

    } catch (error) {

    
        let errors2 = {}

        if (error.code === 11000) { //11000: username ve email uniq olmalidir hatasi
            errors2.email = 'The Email is already registered';
        }

//error mesajlarini errors2 objectine yolluyoruz:
        if (error.name === 'ValidationError') {
          Object.keys(error.errors).forEach((key) => {
            errors2[key] = error.errors[key].message;
          });
        }

        console.log('errors2:::',errors2);


        res.status(400).json(errors2);
    };
}

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const user = await User.findOne({
            username
        })

        let same = false

    // kullanicinin kayitli olup olmadigi kontrol edilir
        if (user) {
            same = await bcrypt.compare(password, user.password) // veritabanindan gelen sifreledigimiz pass ile burada girilen pass uyusuyor mu ona bakiyoruz    
        } else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such user",
            });
        }

    // sifrenin uyusup uyusmadigini kontrol edilir
        if (same) {

            const token = createToken(user._id)
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 100*60*60*24, //1day
            })

            res.redirect("/users/dashboard")

        } else {
            res.status(401).json({
                succeded: false,
                error: "Password are not matched",
            });
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    };
}


const createToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
};



const getDashboardPage = (req, res) => {
    res.render('dashboard', {
        link: 'dashboard',
    })
}


export {
    createUser,
    loginUser,
    getDashboardPage
}