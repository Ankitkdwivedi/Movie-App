
const express = require('express');
const User = require('../Models/User');
const bcrypt=require('bcryptjs');
const tokenGenerator = require('../Token/tokenGenerator');
const Movie = require('../Models/Movie');
const router = express.Router();
// router.get("/me", protectRoute, getMe);
router.post("/signup", async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
        console.log(fullName, email, password );
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		// if (password.length < 6) {
		// 	return res.status(400).json({ error: "Password must be at least 6 characters long" });
		// }

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			tokenGenerator(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
                playlist: newUser.playlist,
			}); 
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		tokenGenerator(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			playlist: user.playlist,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/add/:userId",async(req,res)=>{
    const {userId}=req.params;
    const {movie}=req.body;
    console.log(movie);
    try {
        const user = await User.findById(userId);
        console.log(user);
        user.playlist.push(movie);
        await user.save();
        console.log(user)

        res.status(200).json({ message: 'Movie added to playlist successfully' });
    } catch (error) {
        console.error('Error adding movie to playlist', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
router.get("/playlist/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user document based on userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract privacy and playlist fields from the user document
        const { privacy, playlist } = user;

        res.status(200).json({ privacy, playlist });
    } catch (error) {
        console.error('Error fetching user playlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/playlists", async (req, res) => {
    try {
        // Find all user documents
        const users = await User.find();

        // Extract and filter public playlists from all users
        const publicPlaylists = users.reduce((acc, user) => {
            if (user.privacy === 'public') {
                acc.push({
                    userId: user._id,
                    playlist: user.playlist
                });
            }
            return acc;
        }, []);

        res.status(200).json(publicPlaylists);
    } catch (error) {
        console.error('Error fetching public playlists:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// router.post("/logout", async (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 0 });
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

module.exports=router;

// export const getMe = async (req, res) => {
// 	try {
// 		const us = await User.findById(req.user._id).select("-password");
// 		const user=us.toObject();
// 		const Count = await Notification.countDocuments({ to:req.user._id });
// 		user.NotificationCount=Count;
// 		// console.log(user);
// 		res.status(200).json(user);
// 	} catch (error) {
// 		console.log("Error in getMe controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
