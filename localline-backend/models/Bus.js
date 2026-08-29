import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  name: String,
  nameLocal: String,
  image: String,
  serviceType: String,
  from: String,
  to: String,
  stops: [String],
});

export default mongoose.model("Bus", busSchema);
