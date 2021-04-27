const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) => {
	const blogposts = await BlogPost.find({}).populate('userid')
	console.log('home.js: ', req.session)
	res.render('index', {
		blogposts
	});
}
