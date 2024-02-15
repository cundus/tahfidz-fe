import API from ".";
export const getAllHalaqoh = async () => {
  return (await API.get("/halaqoh")).data;
};

export const deleteHalaqah = async (id) => {
  return (await API.delete(`/halaqoh/${id}`)).data;
};

export const createHalaqah = async ({
  nama_halaqah,
  tahun_ajaran,
  guruId,
  siswaIds,
}) => {
  return (
    await API.delete("/halaqoh", {
      nama_halaqah,
      tahun_ajaran,
      guruId,
      siswaIds,
    })
  ).data;
};
