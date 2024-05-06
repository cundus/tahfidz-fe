import API from ".";
export const getAllTahunAjaran = async () => {
  return (await API.get("/tahun-ajaran")).data;
};

export const getSearchTahunAjaran = async (option, query) => {
  return (await API.get("/tahun-ajaran", { params: { [option]: query } })).data;
};

export const createTahunajaran = async ({ nama_tahun_ajaran, status }) => {
  return (await API.post("/tahun-ajaran", { nama_tahun_ajaran, status })).data;
};

export const deleteTahunajaran = async (id) => {
  return (await API.delete(`/tahun-ajaran/${id}`)).data;
};

export const getDetailTahunAjaran = async (id) => {
  return (await API.get(`/tahun-ajaran/${id}`)).data;
};

export const updateTahunAjaran = async (data, id) => {
  return (await API.put(`/tahun-ajaran/${id}`, data)).data;
};
