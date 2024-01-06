import axios from "axios";
const baseUrl = "https://dummyapi.io/data/v1";

const headers = {
  "app-id": process.env.NEXT_PUBLIC_PUBLICAPI_KEY,
};

export const fetchPosts = async (page, limit) => {
  try {
    const params = {};
    if (page) {
      params.page = page;
    }
    if (limit) {
      params.limit = limit;
    }
    const res = await axios.get(`${baseUrl}/post`, { headers, params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllPosts = async (limit = 50) => {
  try {
    let allPosts = [];
    let page = 0;
    while (true) {
      const params = { page, limit };
      const res = await axios.get(`${baseUrl}/post`, { headers, params });
      if (!res.data.data || res.data.data.length === 0) {
        break;
      }
      allPosts = allPosts.concat(res.data.data);
      page++;
    }
    return allPosts;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPost = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/post/${userId}`, { headers });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (userId) => {
  const res = await axios.delete(`${baseUrl}/post/${userId}`, { headers });
  return res.data;
};

export const updatePost = async (userId, image, likes, text, tags) => {
  const res = await axios.put(
    `${baseUrl}/post/${userId}`,
    {
      image,
      likes,
      text,
      tags,
    },
    { headers }
  );
  return res.data;
};

export const createPost = async (image, likes, text, tags, owner) => {
  const res = await axios.post(
    `${baseUrl}/post/create`,
    {
      image,
      likes,
      text,
      tags,
      owner,
    },
    { headers }
  );
  return res.data;
};
