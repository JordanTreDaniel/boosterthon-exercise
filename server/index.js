import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_DB_CONN_STRING;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("just connected", client.db);
    const collections = await client.db.collections();
    console.log({ collections });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

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
  run().catch(console.dir);

  //will there be resposne? get ids and then..
  //from those ten fundraisers, randomly create 20 reviews
  //insert into db
  res.status(200).json({ msg: "It worked", fundraisers });
});

app.listen("3001", () => {});
