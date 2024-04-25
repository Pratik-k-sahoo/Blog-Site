const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
  content: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Comment = model("comment", commentSchema);

module.exports = Comment;