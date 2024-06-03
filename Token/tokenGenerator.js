const jwt =require("jsonwebtoken");

const tokenGenerator = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET||"ankit", {
		expiresIn: "15d",
	});

	res.cookie("jwt", token);
};
module.exports=tokenGenerator;
