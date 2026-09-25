import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { _id: false }
);

const busSchema = new mongoose.Schema({
  name: String,
  nameLocal: String,
  serviceType: String,
  from: String,
  to: String,
  stops: [String],
  ratings: [ratingSchema],
});

export default mongoose.model("Bus", busSchema);