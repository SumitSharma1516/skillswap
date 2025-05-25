const SwapRequest = require("../models/SwapRequest");

// Send new swap request
exports.sendRequest = async (req, res) => {
  try {
    const { toUserId, skillOffered, skillRequested } = req.body;
    if(!toUserId || !skillOffered || !skillRequested) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newRequest = new SwapRequest({
      fromUser: req.user.id,
      toUser: toUserId,
      skillOffered,
      skillRequested,
    });

    await newRequest.save();
    res.status(201).json({ message: "Swap request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all swap requests for current user (received and sent)
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [
        { fromUser: req.user.id },
        { toUser: req.user.id }
      ]
    }).populate("fromUser", "fullName username photo").populate("toUser", "fullName username photo");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update request status (accept/reject) - only receiver can update
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    if(!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await SwapRequest.findById(requestId);
    if(!request) return res.status(404).json({ message: "Request not found" });

    if(request.toUser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
