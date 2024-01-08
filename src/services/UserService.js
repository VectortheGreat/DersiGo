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
export const fetchAllUsers = async (limit = 50) => {
  try {
    let allUsers = [];
    let page = 0;
    while (true) {
      const params = { page, limit };
      const res = await axios.get(`${baseUrl}/user`, { headers, params });
      if (!res.data.data || res.data.data.length === 0) {
        break;
      }
      allUsers = allUsers.concat(res.data.data);
      page++;
    }
    return allUsers;
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

export const deleteUser = async (userId) => {
  const res = await axios.delete(`${baseUrl}/user/${userId}`, { headers });
  return res.data;
};

// prettier-ignore
export const updateUser = async ( userId, firstName, lastName, phone, gender, title, picture, dateOfBirth, street, city, state, country, timezone ) => {
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
      location: {
        street,
        city,
        state,
        country,
        timezone,
      },
    },
    { headers }
  );
  return res.data;
};

// prettier-ignore
export const createUser = async ( firstName, lastName, email, phone, gender, title, picture, dateOfBirth, street, city, state, country, timezone ) => {
  //* firsName, lastName and email are required
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
      location: {
        street,
        city,
        state,
        country,
        timezone,
      },
    },
    { headers }
  );
  return res.data;
};
