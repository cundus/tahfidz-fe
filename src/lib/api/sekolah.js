import API from '.'

export const getAllSekolah = async () => {
   return (await API.get("/sekolah")).data;
};


export const createSekolah = async (formData) => {
   return (await API.post("/sekolah", formData)).data;
};
