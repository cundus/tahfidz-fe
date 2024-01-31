export const getAllUjian = async () => {
   return (await API.get("/ujian")).data;
};
