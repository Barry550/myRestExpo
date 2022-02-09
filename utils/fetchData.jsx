import axios from "axios";

export const getDataAPI = async (url, token) => {
  return await axios.get(`http://localhost:5000/${url}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postDataAPI = async (url, post, token) => {
  return await axios.post(`http://localhost:5000/${url}`, post, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postDataFileAPI = async (url, post, token) => {
  return await axios.post(`http://localhost:5000/${url}`, post, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchDataAPI = async (url, post, token) => {
  return await axios.patch(`http://localhost:5000/${url}`, post, {
    headers: { Authorization: token },
  });
};

export const putDataAPI = async (url, id, post) => {
  return await axios.put(`http://localhost:5000/${url}/${id}`, post);
};

export const deleteDataAPI = async (url, id) => {
  return await axios.delete(`http://localhost:5000/${url}/${id}`);
};
