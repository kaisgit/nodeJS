const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
   const blogpost = await BlogPost.findById(req.params.id).populate('userid');
   console.log("getPost.js:\n", blogpost)
   res.render('post', {
		blogpost
   });
}
