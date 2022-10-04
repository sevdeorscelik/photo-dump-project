import Photo from '../models/photoModel.js'
import User from '../models/userModel.js'

const getIndexPage = async (req, res) => {

    const photos = await Photo.find().sort({uploadedAt: -1}).limit(3);
    const numOfUser = await User.countDocuments({});
    const numOfPhotos = await Photo.countDocuments({});

    res.render('index', {
        link: 'index',
        photos,
        numOfUser,
        numOfPhotos
    })
}


const getAboutPage = (req, res) => {
    res.render('about', {
        link: 'about',
    })
}

const getRegisterPage = (req, res) => {
    res.render('register', {
        link: 'register',
    })
}

const getLoginPage = (req, res) => {
    res.render('login', {
        link: 'login',
    })
}

const getLogout = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1,
    });
    res.redirect('/login')
}

//logout islemi icin cookie'deki veriyi siliyoruz. ancak bunun icin remove methodu yok. ne yapiyoruz? token'i yeniliyoruz ama buna 1ms lik bir süre verecegiz ve bu sekilde token ucacak.

const getContactPage = (req, res) => {
    res.render('contact', {
        link: 'contact',
    })
}







export {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage,
    getLogout,
    getContactPage,
}