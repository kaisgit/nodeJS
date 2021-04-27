
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt') // bcrypt package
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
	username: {
		type: String,
		//required: true,
		required: [true, 'Please provide username'],
		unique: true },
	password: {
		type: String,
		//required: true }
		required: [true, 'Please provide password'] }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
	const user = this
	console.log(user)

	bcrypt.hash(user.password, 10, (error, hash) => {
		console.log('models/user.js password after encryption: ', hash)
		user.password = hash
		next()
	})
})

const User = mongoose.model('User', UserSchema);
module.exports = User
