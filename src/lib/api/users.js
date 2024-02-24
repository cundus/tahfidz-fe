import API from ".";
export const getAllSiswa = async () => {
  return (
    await API.get("/users", {
      params: {
        page: 1,
        role: "siswa",
        pageSize: 100,
        includeHalaqoh: true,
      },
    })
  ).data;
};
// GURU

export const getAllGuru = async () => {
  return (
    await API.get("/users", {
      params: {
        page: 1,
        role: "guru",
        pageSize: 100,
        includeHalaqoh: true,
      },
    })
  ).data;
};


export const getAllOperator = async () => {
  return (
    await API.get("/users", {
      params: {
        page: 1,
        role: "operator",
        pageSize: 10,
        includeHalaqoh: true,
      },
    })
  ).data;
};


export const getDetailUser = async (id) => {
  return await API.get(`/users/${id}`);
};

export const addUser = async (formData) => {
  return await API.post("/users" ,formData);
};

export const updateUser = async (formData,id) => {
  return await API.put(`/users/${id}` ,formData);
};

export const deleteUser = async (id) => {
  return await API.delete(`/users/${id}`);
};
