const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    imageUrl: {
      type: String,
      default:
        "https://th.bing.com/th?id=OIP.O8vv9O4Ku4HvFQyep-NXMAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },

    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
