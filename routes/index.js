const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;