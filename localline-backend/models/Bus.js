import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  name: String,
  nameLocal: String,
  serviceType: String,
  from: String,
  to: String,
  stops: [String],
  // one rating per user: whoever rates again just updates their own entry
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      stars: { type: Number, min: 1, max: 5 },
    },
  ],
});

export default mongoose.model("Bus", busSchema);