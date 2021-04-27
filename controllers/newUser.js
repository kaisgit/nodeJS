module.exports = (req, res) =>{ 
    var username = "" 
    var password = ""
    const data = req.flash('data')[0];    

    if(typeof data != "undefined"){        
        username = data.username
        password = data.password
    }

	 console.log("newUser.js req.session:\n",  req.session)
     
    res.render('register',{        
		  //errors: req.session.validationErrors
        errors: req.flash('validationErrors'), // typo in pdf. downloaded source code shows correct code.
        username: username,
        password: password
    })
}
