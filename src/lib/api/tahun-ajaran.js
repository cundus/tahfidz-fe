import API from ".";
export const getAllTahunAjaran = async () => {
  return (await API.get("/tahun-ajaran")).data;
};

export const createTahunajaran = async ({ nama_tahun_ajaran, status }) => {
  return (await API.post("/tahun-ajaran", { nama_tahun_ajaran, status })).data;
};

export const deleteTahunajaran = async (id) => {
  return (await API.delete(`/tahun-ajaran/${id}`)).data;
};
