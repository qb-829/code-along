
const express = require(`express`);
const router = express.Router();
const User = require('../helpers/dbConnection')

router.use(function timeLog (req, res, next) {
    console.log(`Time:`, Date.now(), `review.js`);
    next();
});

function requireAuth (req, res, next) {
    next();
}

router.get('/review', requireAuth, async (req, res) => {

    const records = await User.findAll();
    let users = [];
    records.map((record) => {
        users.push(record.dataValues)
    })

    return res.render(`review`, {
        userData: users,
        title: 'review',
        pageID: 'reviewPage'
    })
})

router.post('/review', (req, res) => {
    const { username, beverage} = req.body;
    console.log(username, beverage);
    res.send(`<h1> hey ${username}, you drank ${beverage} </h1>`)
})

module.exports = router