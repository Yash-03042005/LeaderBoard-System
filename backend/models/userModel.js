import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  totalPoints: { type: Number, default: 0 }
});

const userModel = mongoose.models.User || mongoose.model('User',userSchema)

export default userModel
