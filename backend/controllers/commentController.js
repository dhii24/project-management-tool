const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const { cardId } = req.params;

    const { text } = req.body;

    if(!text || !text.trim()){
      return res.status(400).json({
        message: "Comment cannot be empty.",
      });
    }

    const comment = await Comment.create({
      card: cardId,
      user: req.user.userId,
      text: text.trim(),
    });

    await comment.populate("user", "name email");

    res.status(201).json({
      message: "Comment added.",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { cardId } = req.params;

    const comments = await Comment.find({
      card: cardId,
    })
      .populate("user", "name email")
      .sort({
        createdAt: 1,
      });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createComment, getComments };
