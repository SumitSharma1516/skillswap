const Skill = require("../models/Skill");

// Upload skills and bio
exports.uploadSkills = async (req, res) => {
  try {
    const { teachSkills, learnSkills, bio } = req.body;

    // TeachSkills and LearnSkills must be arrays (can be sent as JSON string from frontend)
    let teachArr = typeof teachSkills === "string" ? JSON.parse(teachSkills) : teachSkills;
    let learnArr = typeof learnSkills === "string" ? JSON.parse(learnSkills) : learnSkills;

    // Check if user already has skills
    let skill = await Skill.findOne({ user: req.user.id });
    if(skill) {
      // Update existing
      skill.teachSkills = teachArr;
      skill.learnSkills = learnArr;
      skill.bio = bio || "";
      await skill.save();
      return res.json({ message: "Skills updated" });
    }

    // Else create new
    skill = new Skill({
      user: req.user.id,
      teachSkills: teachArr,
      learnSkills: learnArr,
      bio: bio || ""
    });

    await skill.save();
    res.status(201).json({ message: "Skills uploaded" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skills of all users for public display
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "fullName username photo");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
