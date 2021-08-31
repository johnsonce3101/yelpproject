const express = require('express');
const router = express.Router();
const db = require('../models')

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

    // Vietnamese route

    router.get('/restaurants/vietnamese', (req, res) => {
       db.restaurants.findAll({
           where: {category: 'Vietnamese'}
       }).then((results) => {
           console.log(results)
           res.render('vietnamese', {
               locals: {
                   vietnameseRestaurants: results
               }
           })
       }) 
    })

    router.post('/restaurants/vietnamese/reviews', (req, res) => {
        console.log(req.body)
        db.reviews.create({ review_content: req.body.content, review_category: req.body.rCategory, restaurant_name: req.body.rName}).then((results) => {
            console.log(results)
        })
        res.json({

        })
    })

    router.get('/restaurants/vietnamese/reviews', (req, res) => {
        db.reviews.findAll().then((results) => {
            console.log(results)
            res.render('vietnameseReviews', {
                locals: {
                    vietnameseReviews: results
                }
            })
        })
    })

    router.delete('/restaurants/vietnamese/reviews/:name', (req, res) => {
        console.log(req.params.name)
       db.reviews.destroy({
           where: {
               restaurant_name: req.params.name
           }
       }).then((results) => {
           res.json(results)
       })
    })

    router.put('/restaurants/vietnamese/reviews/:name', (req, res) => {
        console.log(req.params.name)
        db.reviews.update({review_content: req.body.newContent}, {where: {restaurant_name: req.params.name}}).then((results) => res.json(results))
        
    })

    // Breakfast route

    router.get('/restaurants/breakfast', (req, res) => {
        db.restaurants.findAll({
            where: {category: 'Breakfast'}
        }).then((results) => {
            console.log(results)
            res.render('breakfast', {
                locals: {
                    BreakfastRestaurants: results
                }
            })
        }) 
     })

     router.get('/restaurants/breakfast/reviews', (req, res) => {
        db.reviews.findAll().then((results) => {
            console.log(results)
            res.render('breakfastReviews', {
                locals: {
                    breakfastReviews: results
                }
            })
        })
    })

    router.post('/restaurants/breakfast/reviews', (req, res) => {
        console.log(req.body)
        db.reviews.create({ review_content: req.body.content, review_category: req.body.rCategory, restaurant_name: req.body.rName}).then((results) => {
            console.log(results)
        })
        res.json({

        })
    })

    router.delete('/restaurants/breakfast/reviews/:name', (req, res) => {
        console.log(req.params.name)
       db.reviews.destroy({
           where: {
               restaurant_name: req.params.name
           }
       }).then((results) => {
           res.json(results)
       })
    })

    // FastFood Route
    router.get('/restaurants/fastfood', (req, res) => {
        db.restaurants.findAll({
            where: {category: 'Fast Food'}
        }).then((results) => {
            console.log(results)
            res.render('fastFood', {
                locals: {
                    fastFoodRestaurants: results
                }
            })
        }) 
     })

     router.get('/restaurants/fastfood/reviews', (req, res) => {
        db.reviews.findAll().then((results) => {
            console.log(results)
            res.render('fastFoodReviews', {
                locals: {
                    fastFoodReviews: results
                }
            })
        })
    })

    router.post('/restaurants/fastfood/reviews', (req, res) => {
        console.log(req.body)
        db.reviews.create({ review_content: req.body.content, review_category: req.body.rCategory, restaurant_name: req.body.rName}).then((results) => {
            console.log(results)
        })
        res.json({

        })
    })

    router.delete('/restaurants/fastfood/reviews/:name', (req, res) => {
        console.log(req.params.name)
       db.reviews.destroy({
           where: {
               restaurant_name: req.params.name
           }
       }).then((results) => {
           res.json(results)
       })
    })




module.exports = router;