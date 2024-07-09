const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pageViews: {
      type: Number,
      default: 0
    },

    category: {
      type: String
    },

    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    images: [{
      res: String,
      public_id: String,
      asset_id: String
    }],

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
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
