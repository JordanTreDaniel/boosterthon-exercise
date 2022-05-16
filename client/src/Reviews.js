import * as React from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getFundraiserDetails, currentFundraiserId } from "./recoil";
import ReviewForm from "./ReviewForm";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Reviews = () => {
  const [reviewing, setReviewing] = React.useState(false);
  const [fundraiserId, setCurrentFundraiserId] =
    useRecoilState(currentFundraiserId);
  const currentFundraiserLoadable =
    useRecoilValueLoadable(getFundraiserDetails);
  switch (currentFundraiserLoadable.state) {
    case "loading":
      return <h1>Loading</h1>;
    case "hasError":
      return <h1>Has error</h1>;
    case "hasValue":
    default:
      const currentFundraiser = currentFundraiserLoadable.contents;
      if (!currentFundraiser) return null;
      const { name, reviews } = currentFundraiser;
      return (
        <Dialog
          fullScreen={true}
          open={fundraiserId !== null}
          onClose={() => {
            setCurrentFundraiserId(null);
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`Reviews for ${name}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It's important to know who you are working with! Take comfort that
              we painstakingly generated nonsensical things to say about these
              fundraisers, which were generated at random. :)
            </DialogContentText>
            <List>
              {reviews.map((r, i) => {
                const { rating, review, date, reviewer } = r;
                const displayDate = new Date(date).toLocaleDateString();
                return (
                  <ListItem key={i}>
                    <Card style={{ width: "100%" }}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                          <Grid container wrap="nowrap">
                            <Grid item xs={2}>
                              <PersonIcon
                                style={{ fontSize: "3em" }}
                              ></PersonIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography gutterBottom variant="h6">
                                {reviewer.name}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography gutterBottom variant="h2">
                            {rating}
                          </Typography>
                          <Typography gutterBottom variant="h5">
                            {displayDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              textOverflow: "ellipsis",
                              height: "3em",
                              paddingBottom: "1.2em",
                            }}
                            onClick={(e) => {
                              const current = e.target.style.height;
                              e.target.style.height =
                                current === "3em" ? "100%" : "3em";
                            }}
                          >
                            {review}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Card>
                  </ListItem>
                );
              })}
            </List>
            <ReviewForm
              reviewing={reviewing}
              setReviewing={setReviewing}
              fundraiser={currentFundraiser}
            ></ReviewForm>
          </DialogContent>
          <DialogActions>
            <Button variant="filled" onClick={() => setReviewing(true)}>
              Review
            </Button>
            <Button onClick={() => setCurrentFundraiserId(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      );
  }
};

export default Reviews;
