import express from "express";
import _mongoose from "mongoose";
import cors from "cors";
import { getRandomElement, imageAddresses, loremIpsum } from "./helpers.js";
import { Fundraiser, Review, Reviewer } from "./models.js";
let mongoose;
async function connectDb() {
  mongoose = await _mongoose.connect(process.env.MONGO_DB_CONN_STRING);
}

connectDb().catch((err) => console.error("Problem connecting to the DB", err));

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

app.get("/fundraisers", async (req, res) => {
  const fundraisers = await Fundraiser.find();
  res.status(200).json({
    fundraisers: fundraisers.map((f) => f.toObject()),
  });
});

app.get("/fundraisers/:fundraiserId", async (req, res) => {
  const { params } = req;
  const { fundraiserId } = params;
  const fundraiser = await Fundraiser.findById(fundraiserId);
  const reviews = await Review.find({ fundraiser: fundraiserId }).populate(
    "reviewer"
  );

  res.status(200).json({
    fundraiser: {
      ...fundraiser.toObject(),
      reviews: reviews.map((r) => r.toObject()),
    },
  });
});

app.post("/fundraisers/:fundraiserId/review", async (req, res) => {
  try {
    const { params, body } = req;
    const { fundraiserId } = params;
    const { newReview } = body;
    const { reviewer: newReviewer } = newReview;
    const anonReviewer = {
      name: `${newReviewer.firstName} ${newReviewer.lastName}`,
      email: newReviewer.email,
    };
    let reviewer = await Reviewer.findOne(anonReviewer).exec();
    if (reviewer) {
      const existingReviews = await Review.find({
        reviewer: reviewer._id,
        fundraiser: fundraiserId,
      }).exec();
      if (existingReviews.length) {
        res.status(406).json("You may not review the same fundraiser twice.");
        return;
      }
    } else {
      reviewer = await Reviewer.create(anonReviewer);
      await reviewer.save();
    }
    let review = await Review.create({
      ...newReview,
      reviewer: reviewer._id,
      fundraiser: fundraiserId,
    });
    const reviewId = review._id;
    await review.save();
    review = await Review.findById(reviewId)
      .populate("reviewer")
      .populate("fundraiser")
      .exec();
    res.status(200).json({
      review: review.toObject(),
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/fundraisers/new", async (req, res) => {
  try {
    const { body } = req;
    const { newFundraiser } = body;
    const { name, imageUrl } = newFundraiser;

    let fundraiser = await Fundraiser.create({
      name,
      imageUrl:
        imageUrl && imageUrl.length
          ? imageUrl
          : getRandomElement(imageAddresses),
    });
    await fundraiser.save();

    res.status(200).json({
      fundraiser: fundraiser.toObject(),
    });
  } catch (error) {
    res.status(500).json(error);
  }
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
        imageUrl: getRandomElement(imageAddresses),
      });
    }

    await Fundraiser.create(fundraisers);
  }

  fundraisers = await Fundraiser.find();

  let reviews = await Review.find().populate("fundraiser");
  if (!reviews.length) {
    const firstNames = [
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
      const randomFirstName = getRandomElement(firstNames);
      const randomLastName = getRandomElement(lastNames);
      const reviewerName = `${randomFirstName} ${randomLastName}`;
      const reviewerEmail = `${randomFirstName.toLocaleLowerCase()}${randomLastName.toLocaleLowerCase()}@fakegmail.com`;
      const reviewer = await Reviewer.create({
        name: reviewerName,
        email: reviewerEmail,
      });
      const rating = Math.floor(Math.random() * 5);
      const review = loremIpsum;
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
