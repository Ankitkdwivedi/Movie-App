const mongoose = require('mongoose');
const Movie = require('./Movie');

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	privacy: {
		type: String, // Possible values are 'private' or 'public'
		default: 'public'
	},
	playlist:[
	],
},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
