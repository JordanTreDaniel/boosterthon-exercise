import "./App.css";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { Grid } from "@mui/material";
import { getFundraisers } from "./recoil";
import FundraiserCard from "./FundraiserCard";
import Reviews from "./Reviews";

function App() {
  // const reviewsLoadable = useRecoilValueLoadable(getFundraisers);
  const fundraisersLoadable = useRecoilValueLoadable(getFundraisers);
  return (
    <div className="App">
      <Reviews></Reviews>
      <Grid id="Fundraiser List">
        {fundraisersLoadable.state !== "loading"
          ? fundraisersLoadable.contents.map((fundraiser, idx) => {
              return <FundraiserCard key={idx} fundraiser={fundraiser} />;
            })
          : "Wait"}
      </Grid>
    </div>
  );
}

export default App;
