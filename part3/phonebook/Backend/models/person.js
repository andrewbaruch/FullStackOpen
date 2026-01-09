const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {family: 4})

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Too Short of a name! Need 3 letters minimum"],
    required: [true, "Did you forget this person's name?"]
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Follow the following guideline: {2 or 3 numbers}-{more numbers!}.`
    },
    minLength: [9, "Too short of a number! 8 numbers minimum"],
    required: [
      true,
      "Why store someones contact when you dont put their number buddy?"
    ]
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
