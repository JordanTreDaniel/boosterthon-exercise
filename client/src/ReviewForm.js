import * as React from "react";
import { useSetRecoilState } from "recoil";
import { dataRefreshTrigger } from "./recoil";
import get from "lodash/get";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  Slider,
} from "@mui/material";
import axios from "axios";

const ReviewForm = (props) => {
  const { reviewing, setReviewing, fundraiser } = props;
  const { name: fundraiserName, _id: fundraiserId } = fundraiser;
  const setDataRefreshTrigger = useSetRecoilState(dataRefreshTrigger);
  const [newReview, setReview] = React.useState({
    rating: 5,
    review: "",
    fundraiser: fundraiserId,
    date: new Date(),
    reviewer: { firstName: "", lastName: "", email: "" },
  });
  const [reviewingError, setReviewingError] = React.useState(null);
  return (
    <Dialog
      fullScreen={false}
      open={reviewing}
      onClose={() => {
        setReviewing(false);
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{`Leave a review for ${fundraiserName}`}</DialogTitle>
      <DialogContent>
        <Grid style={{ backgroundColor: "red" }}>
          {reviewingError ? reviewingError.message : null}
        </Grid>
        <Slider
          min={1}
          max={5}
          step={0.5}
          value={newReview.rating}
          marks={[
            { label: "1", value: 1 },
            { label: "3", value: 3 },
            { label: "5", value: 5 },
          ]}
          style={{ marginBottom: "2em" }}
          onChange={(e) => {
            setReview({ ...newReview, rating: e.target.value });
          }}
        ></Slider>
        <Input
          required
          type="text"
          value={get(newReview, ["reviewer", "firstName"])}
          onChange={(e) =>
            setReview({
              ...newReview,
              reviewer: { ...newReview.reviewer, firstName: e.target.value },
            })
          }
          placeholder="First Name"
        ></Input>
        <Input
          required
          type="text"
          value={get(newReview, ["reviewer", "lastName"])}
          onChange={(e) =>
            setReview({
              ...newReview,
              reviewer: { ...newReview.reviewer, lastName: e.target.value },
            })
          }
          placeholder="Last Name"
        ></Input>
        <Input
          required
          type="email"
          value={get(newReview, ["reviewer", "email"])}
          onChange={(e) =>
            setReview({
              ...newReview,
              reviewer: { ...newReview.reviewer, email: e.target.value },
            })
          }
          placeholder="Email"
        ></Input>
        <Input
          required
          type="textarea"
          fullWidth
          placeholder={`${fundraiserName} is such a...`}
          rows={6}
          multiline
          value={newReview.review}
          onChange={(e) => setReview({ ...newReview, review: e.target.value })}
        ></Input>
      </DialogContent>
      <DialogActions>
        <Button
          variant="filled"
          onClick={async () => {
            try {
              const response = await axios.post(
                `/api/fundraisers/${fundraiserId}/review`,
                {
                  newReview,
                }
              );
              const { data } = response;
              const { review } = data;
              if (review) {
                setDataRefreshTrigger(Date.now());
                setReviewing(false);
              }
            } catch (error) {
              console.info(error);
              setReviewingError(error);
            }
          }}
        >
          Submit Review
        </Button>
        <Button onClick={() => setReviewing(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;
