import API from '.'
export const getAllHafalan = async () => {
   return (await API.get("/hafalan")).data;
};
