import React from "react";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { currentFundraiserId } from "./recoil";

const FundraiserCard = (props) => {
  const { fundraiser } = props;
  const { name, imageUrl, _id } = fundraiser;
  const setCurrentFundraiserId = useSetRecoilState(currentFundraiserId);
  return (
    <Card
      onClick={() => {
        setCurrentFundraiserId(_id);
      }}
    >
      <CardMedia
        component="img"
        height="140"
        src={imageUrl}
        alt={"A pretty image"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Help us raise money for {name}, so that we can be the change the want
          to see in the world.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          See Reviews
        </Button>
        <Button size="small" variant="filled">
          Review
        </Button>
      </CardActions>
    </Card>
  );
};

export default FundraiserCard;
