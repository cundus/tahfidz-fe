export const getAllTahunAjaran = async () => {
   return (await API.get("/tahun-ajaran")).data;
};
