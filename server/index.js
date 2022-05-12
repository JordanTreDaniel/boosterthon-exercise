import express from "express";
import _mongoose from "mongoose";
import cors from "cors";

let mongoose;

async function connectDb() {
  mongoose = await _mongoose.connect(process.env.MONGO_DB_CONN_STRING);
}

connectDb().catch((err) => console.log("Problem connecting to the DB", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.get("/test", (req, res) => {
  res
    .status(200)
    .json({ msg: "Jordan would be such a great employee to hire." });
});

app.get("/seedthedb", (req, res) => {
  //create the fundraisers table

  //create the review table
  //randomly create 10 fundraisers
  const adjectives = ["Funny", "Red", "Tangible", "Observant", "Dangerous"];
  const nouns = ["Sanctuary", "Refuge", "Academy", "Place", "School"];
  const fundraisers = [];
  for (let i = 0; i < 10; i++) {
    const getRandomElement = (arr) => {
      const randomIdx = Math.floor(Math.random() * arr.length);
      return arr[randomIdx];
    };
    fundraisers.push(
      getRandomElement(adjectives) + " " + getRandomElement(nouns)
    );
  }

  //will there be resposne? get ids and then..
  //from those ten fundraisers, randomly create 20 reviews
  //insert into db
  res.status(200).json({ msg: "It worked", fundraisers });
});

app.listen("3001", () => {});
