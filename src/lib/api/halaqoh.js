export const getAllHalaqoh = async () => {
   return (await API.get("/halaqoh")).data;
};
