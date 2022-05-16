import * as React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { dataRefreshTrigger, fundraiserBeingCreated } from "./recoil";
import get from "lodash/get";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import axios from "axios";

const FundraiserForm = (props) => {
  const setDataRefreshTrigger = useSetRecoilState(dataRefreshTrigger);
  const [newFundraiser, setFundraiser] = React.useState({
    name: "",
    imageUrl: "",
  });
  const [fundraisering, setFundraisering] = useRecoilState(
    fundraiserBeingCreated
  );
  return (
    <Dialog
      fullScreen={false}
      open={fundraisering}
      onClose={() => {
        setFundraisering(false);
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{`Create a new fundraiser`}</DialogTitle>
      <DialogContent>
        <Input
          type="text"
          value={get(newFundraiser, ["name"])}
          required
          onChange={(e) =>
            setFundraiser({
              ...newFundraiser,
              name: e.target.value,
            })
          }
          placeholder="Name"
        ></Input>
        <Input
          type="text"
          value={get(newFundraiser, ["imageUrl"])}
          onChange={(e) =>
            setFundraiser({
              ...newFundraiser,
              imageUrl: e.target.value,
            })
          }
          placeholder="Image URL"
        ></Input>
      </DialogContent>
      <DialogActions>
        <Button
          variant="filled"
          onClick={async () => {
            try {
              const response = await axios.post(`/api/fundraisers/new`, {
                newFundraiser,
              });
              const { data } = response;
              const { fundraiser } = data;
              if (fundraiser) {
                setDataRefreshTrigger(Date.now());
                setFundraisering(false);
              }
            } catch (error) {
              console.info(error);
            }
          }}
        >
          Create New Fundraiser
        </Button>
        <Button onClick={() => setFundraisering(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FundraiserForm;
