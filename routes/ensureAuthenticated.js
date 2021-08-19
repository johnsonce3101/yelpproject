module.exports = ensureAuthenticated;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next ();
    }
    res.send('access denied')
}
