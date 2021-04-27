const express = require('express')
const path = require('path')

const app = new express()
app.use(express.static('public'))

const ejs = require('ejs')
app.set('view engine','ejs')

const mongoose = require('mongoose');
// LOCAL MONGOOSE DATABASE CONNECTION
//mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});
// MONGODB CLOUD
mongoose.connect('mongodb+srv://mongo1:guest@cluster0.d2pgj.mongodb.net/my_database', {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true});


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const BlogPost = require('./models/BlogPost.js')

const fileUpload = require('express-fileupload')
app.use(fileUpload())

// LOCAL
//app.listen(4000, ()=>{
	//console.log('App listening on port 4000')
//})

// HEROKU
let port = process.env.PORT;
if (port == null || port == "") {
	port = 4000;
}
app.listen(port, ()=>{
	console.log('App listening on port 4000...')
})


/*
app.get('/', (req,res)=>{
	//res.sendFile(path.resolve(__dirname, 'pages/index.html'))
	res.render('index');
})
app.get('/about', (req,res)=>{
	//res.sendFile(path.resolve(__dirname, 'pages/about.html'))
	res.render('about');
})
app.get('/contact', (req,res)=>{
	//res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
	res.render('contact');
})
app.get('/post', (req,res)=>{
	//res.sendFile(path.resolve(__dirname, 'pages/post.html'))
	res.render('post');
})
*/

/* === BLOG ======================================= */
/* WATCH FOR URL CONFLICTS WITH TEST URLS ABOVE */

/* CONTROLLER */
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash')

/* MIDDLEWARE - checks to see if data is valid or not null. */
const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

/* SESSION */
const expressSession = require('express-session')
app.use(expressSession(
	{
	secret: 'keyboard cat',
	saveUninitialized: true  // to supress error message "express-session deprecated"
	}
))

/* HIDE LOGIN/NEW USER LINKS IF ALREADY LOGGED IN */
global.loggedIn = null;  // global - is accessible from all .ejs files.

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;  // set 'loggedIn' if user is logged in
    next()   
});


/* URL ROUTES */
app.use(flash())   // must be before calling the routes

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)

app.use('/posts/store', validateMiddleware)
app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound')); // notfound.ejs




/*
app.get('/', async (req,res)=>{
   const blogposts = await BlogPost.find({})
   //res.render('index', { blogposts: blogposts});  // if 'blogposts' key and value are the same name, ok to shorten like below.
   res.render('index', { blogposts });
})

app.get('/posts/new', (req, res)=>{
	res.render('create')
})

// console.log(req.body) => req.body.title, req.body.body
app.post('/posts/store', async (req,res)=>{
	let image = req.files.image;
	image.mv(path.resolve(__dirname, 'public/img', image.name), async (error)=>{
		await BlogPost.create({
			...req.body, 
			image: '/img/' + image.name
		})
		res.redirect('/')
	})
})

app.get('/post/:id', async (req,res)=>{
	const blogpost = await BlogPost.findById(req.params.id)
	console.log(req.params, blogpost);
	res.render('post', { blogpost })
})
*/
