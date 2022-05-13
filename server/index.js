import express from "express";
import _mongoose from "mongoose";
import cors from "cors";
import { getRandomElement } from "./helpers.js";
import { Fundraiser, Review, Reviewer } from "./models.js";

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

app.get("/seedthedb", async (req, res) => {
  await Fundraiser.deleteMany();
  await Review.deleteMany();
  await Reviewer.deleteMany();

  let fundraisers = await Fundraiser.find();

  if (!fundraisers.length) {
    const adjectives = ["Funny", "Red", "Tangible", "Observant", "Dangerous"];
    const nouns = ["Sanctuary", "Refuge", "Academy", "Place", "School"];
    for (let i = 0; i < 10; i++) {
      fundraisers.push({
        name: getRandomElement(adjectives) + " " + getRandomElement(nouns),
      });
    }

    await Fundraiser.create(fundraisers);
  }

  fundraisers = await Fundraiser.find();

  let reviews = await Review.find().populate("fundraiser");
  if (!reviews.length) {
    const firstnames = [
      "Alexa",
      "Jordan",
      "John",
      "Margaret",
      "Desirae",
      "Anisha",
      "Selena",
      "Gurptu",
    ];
    const lastNames = [
      "Johnson",
      "Michaels",
      "Carson",
      "Mathis",
      "Smith",
      "Southerly",
    ];
    for (let i = 0; i < 20; i++) {
      const reviewerName = `${getRandomElement(firstnames)} ${getRandomElement(
        lastNames
      )}`;
      const reviewer = await Reviewer.create({
        name: reviewerName,
        email: `${reviewerName}@fakegmail.com`,
      });
      const rating = Math.floor(Math.random() * 5);
      const review = "Lorem ipsum";
      const date = Date.now();
      const randomFundraiser = getRandomElement(fundraisers);
      reviews.push({
        fundraiser: randomFundraiser._id,
        rating,
        review,
        date,
        reviewer: reviewer._id,
      });
    }

    await Review.create(reviews);
  }
  reviews = await Review.find().populate("fundraiser").populate("reviewer");

  res.status(200).json({ reviews: reviews.map((r) => r.toObject()) });
});

app.listen("3001", () => {});
