/* MIDDLEWARE - checks to see if data is valid or not null. */
module.exports = (req, res, next) => {
    //if(req.files == null || req.body.title == null || req.body.title == null){
    if(req.body.title == null || req.body.body == null){
        console.log("validateMiddleware.js\nPlease fill out all the fields.")
        return res.redirect('/posts/new')
    }
    next()
}
