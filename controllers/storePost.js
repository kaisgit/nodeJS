const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req,res) => {
   let image = req.files.image;
	image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
		await BlogPost.create({
			...req.body,
			image: '/img/' + image.name,
			userid: req.session.userId
		})
		res.redirect('/')
	})
}

// post without image - also remove image field in models/BlogPost.js
/*
module.exports = (req,res) => {
	BlogPost.create({
		...req.body,
		userid: req.session.userId
	})
	res.redirect('/')
}
*/
