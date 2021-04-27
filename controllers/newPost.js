module.exports = (req, res) => {
	if(req.session.userId){
		return res.render("create", {
			createPost: true		// to add WYSIWYG editor
		});
	}
	res.redirect('/auth/login')
}
