
const getIndexPage = (req, res) => {
    res.render('index', {
        link: 'index'
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






export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout}