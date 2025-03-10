const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    //   trending: {
    //     type: Boolean,
    //     required: true,
    //   },

    coverImage: {
      type: String,
      required: false,
      default: "book-18.png",
    },

    oldPrice: {
      type: Number,
      required: true,
    },

    newPrice: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      defaullt: Date.now,
    },
  },

  { timestamp: true }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
