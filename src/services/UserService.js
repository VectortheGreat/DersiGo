import axios, { all } from "axios";
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
    let page = 1;

    while (true) {
      const params = { page, limit };
      const res = await axios.get(`${baseUrl}/user`, { headers, params });

      // Eğer sayfa boşsa veya kullanıcı kalmadıysa döngüyü sonlandır
      if (!res.data || res.data.length === 0) {
        break;
      }

      // Kullanıcıları genel listeye ekle
      allUsers = allUsers.concat(res.data);

      // Bir sonraki sayfaya geç
      page++;
    }
    console.log(allUsers);
    return allUsers;
  } catch (error) {
    console.error("HATA: ", error);
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
};
