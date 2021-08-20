const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('template',{
        locals: {
            title: 'Restaurant Reviewer'
        },

        // This is the view
        partials: {
            partial: "index"
        }
    })
});

router.get('/users/register', (req, res) => {
    res.render('register')
});

router.get('users/login', (req, res) => {
    res.render('login')
});

router.post('/register', async (req, res) => {
    let{name, email, userName, password} = req.body
        const newUser = await Users.find({
            where: {
                name: !name,
                email: !email,
                userName: !userName
            },
        });
        if (!newUser) {
            res.send(`${userName} already exists. please try again`)
        }
        else async (newUser) => {
            const hashedPassword = await bcrypt.hash(password, 10);

            const createUser = await Users.create({
                name: name,
                email: email,
                userName: userName,
                password: hashedPassword
            });
            res.redirect(`/login`);
            
        };
    });


// router.post('/register', () => {
//     console.log('works')
// });

module.exports = router;