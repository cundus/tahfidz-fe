import API from ".";

export const getRapor = async (id) => {
  return (await API.get(`/rapor?siswaId=${id}`)).data;
};
