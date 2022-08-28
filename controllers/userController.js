import User from "../models/userModel.js";
import bcrypt from 'bcrypt'


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            succeded: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    };
}

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const user = await User.findOne({
            username: username
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
            res.status(200).send("You are loggend in")
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


export {
    createUser,
    loginUser
}