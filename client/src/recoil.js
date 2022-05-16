import axios from "axios";
import { selector, atom } from "recoil";

export const fetchData = selector({
  key: "fetchData",
  get: async () => {},
});

export const getFundraisers = selector({
  key: "fundraisers",
  get: async ({ get }) => {
    try {
      const response = await axios.get("/api/fundraisers");
      return response.data.fundraisers;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
});

export const currentFundraiserId = atom({
  key: "currentFundraiserId",
  default: null,
});

export const getFundraiserDetails = selector({
  key: "getFundraiserDetails",
  get: async ({ get }) => {
    const fundraiserId = get(currentFundraiserId);
    if (fundraiserId) {
      try {
        const response = await axios.get(`/api/fundraisers/${fundraiserId}`);
        const { fundraiser } = response.data;
        return fundraiser;
      } catch (err) {
        console.error(err);
        return {};
      }
    }
  },
});
