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

export const getSearchHalaqoh = async (option, query) => {
  return (await API.get("/halaqoh", { params: { [option]: query } })).data;
}


export const getDetailHalaqah = async(id) => {
  return (await API.get("/halaqoh/"+ id)).data
}

export const updateHalaqoh = async ({
  nama_halaqoh,
  tahun_ajaran,
  guruId,
  siswaIds,
  status
},id) => {
  return (
    await API.put("/halaqoh/"+ id, {
      nama_halaqoh,
      tahun_ajaran,
      guruId,
      siswaIds,
      status
    })
  ).data;
};
