
const express = require(`express`);
const router = express.Router();
const User = require('../helpers/dbConnection')

router.use(function timeLog (req, res, next) {
    console.log(`Time:`, Date.now(), `authentication.js`);
    next();
});

router.get('/register', (req, res) => {
    return res.render(`register`, {
        title: 'Register',
        pageID: 'registerPage'
    })
})

router.post('/register', async (req, res) => {
   try {
    const { firstName, lastName, email, username, password } = req.body;

    const records = await User.findAll({where: {email:email}});
        
    if(records.length === 0) {
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        })
        return res.redirect(`login`)
    }
    else{
        console.log(`email already exists`)
        return res.status(422).send({error: `Email already exists`})
    }

   } catch (error) {
    
   }
   
    const { firstName, lastName, email, username, password } = req.body;
    return res.redirect(`login`)
})

router.get('/login', (req, res) => {
    return res.render(`login`, {
        title: 'login',
        pageID: 'loginPage'
    })
})

router.post('/login', async (req, res) => {
    
    
    try {
        const { username, password} = req.body;
        const records = await User.findAll({where: {username:username}});

        if(records !== null) {
            if(password === records[0].dataValues.password){
                return res.redirect(`review`)

            }
            else {
                console.log(`password does not match`);
                return res.redirect(`login`)
            }

        }

    } catch (error) {
        console.log(error)
    }
    return res.redirect(`review`)
})

router.get('/logout', (req, res) => {
    return res.redirect(`login`)
})
module.exports = router