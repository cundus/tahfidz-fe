import API from '.'
export const getAllKehadiran = async () => {
   return (await API.get("/kehadiran")).data;
};
