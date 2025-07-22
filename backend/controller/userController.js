import historyModel from "../models/historyModel.js";
import userModel from "../models/userModel.js";

// api to add the user in database
 const addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.json({ success: false, message: "Name is required" });
    }

    // Check for duplicate user name
    const existingUser = await userModel.findOne({ name: name.trim() });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new userModel({ name: name.trim() });
    await user.save();

    res.json({ success: true, message: "User added successfully"});

  } catch (error) {
    console.error("Error adding user:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get All Users (for Leaderboard)
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}) // Sorted by points
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.json({ success: false, message: "Failed to fetch users" });
  }
};

const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const claimedPoints = Math.floor(Math.random() * 10) + 1;

    const updatedUser = await userModel.findByIdAndUpdate(userId,{ $inc: { totalPoints: claimedPoints } },{ new: true });

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({success: true,message: `${claimedPoints} points claimed successfully!`,claimedPoints});
  } catch (error) {
    console.error("Error claiming points:", error);
    res.json({ success: false, message: "Failed to claim points" });
  }
};

// Create history when user claims points
const createHistory = async (req, res) => {

  const { userId, pointsClaimed } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const history = new historyModel({
      userId,
      userName: user.name,
      pointsClaimed,
    });

    await history.save();

    res.json({ success: true, message: 'History created', history });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error creating history' });
  }
};

// Get all history records
const getAllHistory = async (req, res) => {
  try {
    const history = await historyModel.find({})
    res.json({ success: true, history });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching history' });
  }
};


export {addUser,getAllUsers,claimPoints,createHistory,getAllHistory}