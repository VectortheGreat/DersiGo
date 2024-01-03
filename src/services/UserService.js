import axios from "axios";
const baseUrl = "https://dummyapi.io/data/v1";

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/user`, {
      headers: {
        "app-id": process.env.API_ID,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
