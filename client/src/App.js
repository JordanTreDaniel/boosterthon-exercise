import "./App.css";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { Grid } from "@mui/material";
import { getFundraisers, getReviews } from "./recoil";
import FundraiserCard from "./FundraiserCard";

function App() {
  // const reviewsLoadable = useRecoilValueLoadable(getFundraisers);
  const fundraisersLoadable = useRecoilValueLoadable(getFundraisers);
  return (
    <div className="App">
      <header className="App-header"></header>
      <Grid id="Fundraiser List">
        {fundraisersLoadable.state === "loading" ? "Loading" : "Not Loading"}
        {fundraisersLoadable.state !== "loading"
          ? fundraisersLoadable.contents.map((fundraiser, idx) => {
              console.log("This is the American", fundraiser);
              return <FundraiserCard key={idx} fundraiser={fundraiser} />;
            })
          : "Wait"}
      </Grid>
    </div>
  );
}

export default App;
