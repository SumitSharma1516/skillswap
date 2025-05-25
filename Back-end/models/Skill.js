const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teachSkills: [{ type: String }],   // array of skills user can teach
  learnSkills: [{ type: String }],   // array of skills user wants to learn
  bio: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
