export const getAllSekolah = async () => {
   return (await API.get("/sekolah")).data;
};
