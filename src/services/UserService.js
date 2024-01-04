import axios from "axios";
const baseUrl = "https://dummyapi.io/data/v1";

const headers = {
  "app-id": process.env.NEXT_PUBLIC_PUBLICAPI_KEY,
};

export const fetchUsers = async (page, limit) => {
  try {
    const params = {};
    if (page) {
      params.page = page;
    }
    if (limit) {
      params.limit = limit;
    }
    const res = await axios.get(`${baseUrl}/user`, { headers, params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchUser = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/user/${userId}`, { headers });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (userId, firstName, lastName, phone, gender, title, picture, dateOfBirth) => {
  try {
    const res = await axios.put(
      `${baseUrl}/user/${userId}`,
      {
        title,
        firstName,
        lastName,
        picture,
        phone,
        gender,
        dateOfBirth,
      },
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (firstName, lastName, email, phone, gender, title, picture, dateOfBirth) => {
  //* firsName, lastName and email are required
  try {
    const res = await axios.post(
      `${baseUrl}/user/create`,
      {
        title,
        firstName,
        lastName,
        email,
        picture,
        phone,
        gender,
        dateOfBirth,
      },
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
