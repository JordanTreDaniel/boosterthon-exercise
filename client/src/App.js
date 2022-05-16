import "./App.css";
import React from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Grid, Button } from "@mui/material";
import { getFundraisers, fundraiserBeingCreated } from "./recoil";
import FundraiserCard from "./FundraiserCard";
import Reviews from "./Reviews";
import NewFundraiser from "./NewFundraiser";

function App() {
  // const reviewsLoadable = useRecoilValueLoadable(getFundraisers);
  const fundraisersLoadable = useRecoilValueLoadable(getFundraisers);
  const setFundraisering = useSetRecoilState(fundraiserBeingCreated);
  return (
    <div className="App">
      <Reviews></Reviews>
      <NewFundraiser></NewFundraiser>
      <Button fullWidth onClick={() => setFundraisering(true)}>
        Create New Fundraiser
      </Button>
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
