const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then((res) => {
    console.log("Shabash");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Ahmad",
    to: "Ali",
    msg: "Hello ali i'm in the uni",
    created_at: new Date(),
  },
  {
    from: "Javed",
    to: "Karim",
    msg: "tommorow is match",
    created_at: new Date(),
  },
  {
    from: "Fatima",
    to: "Zainab",
    msg: "The dish was amazing",
    created_at: new Date(),
  },
  {
    from: "Tayyab",
    to: "Sageer",
    msg: "hahahahah",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
