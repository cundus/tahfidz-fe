import API from ".";
export const getAllHalaqoh = async () => {
  return (await API.get("/halaqoh")).data;
};

export const deleteHalaqah = async (id) => {
  return (await API.delete(`/halaqoh/${id}`)).data;
};

export const createHalaqah = async ({
  nama_halaqoh,
  tahun_ajaran,
  guruId,
  siswaIds,
  status
}) => {
  return (
    await API.post("/halaqoh", {
      nama_halaqoh,
      tahun_ajaran,
      guruId,
      siswaIds,
      status
    })
  ).data;
};


export const getDetailHalaqah = async(id) => {
  return (await API.get("/halaqoh/"+ id)).data
}