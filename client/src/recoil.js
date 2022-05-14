import axios from "axios";
import { selector } from "recoil";

export const fetchData = selector({
  key: "fetchData",
  get: async () => {
    const response = await axios.get("/api/data");
    return response.data;
  },
});

export const getReviews = selector({
  key: "reviews",
  get: ({ get }) => {
    const data = get(fetchData);
    return data.reviews;
  },
});

export const getFundraisers = selector({
  key: "fundraisers",
  get: async ({ get }) => {
    console.log("running it");
    const data = await get(fetchData);
    console.log({ data });
    return data.fundraisers;
  },
});
