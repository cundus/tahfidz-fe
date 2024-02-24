import API from ".";
export const getAllHafalan = async (siswaId) => {
  return (await API.get("/hafalan", {
    params: {
      page: 1,
      pageSize: 10,
      siswaId: siswaId
    }
  })).data;
};

export const getDetailHafalan = async (id) => {
  return (await API.get("/hafalan/" + id)).data;
};

export const cretaHafalan = async (
  {
    baris,
    ayat_awal,
    ayat_akhir,
    surat_awal,
    surat_akhir,
    nilai_hafalan,
    nilai_tajwid,
    siswaId,
    halaqohId,
    tanggal
  },
  type
) => {
  return (
    await API.post(
      "/hafalan/",
      {
        baris,
        ayat_awal,
        ayat_akhir,
        surat_awal,
        surat_akhir,
        nilai_hafalan,
        nilai_tajwid,
        siswaId,
        halaqohId,
        tanggal
      },
      {
        params: {
          type: type,
        },
      }
    )
  ).data;
};

export const updateHafalan = async (
  {
   baris,
   ayat_awal,
   ayat_akhir,
   surat_awal,
   surat_akhir,
   nilai_hafalan,
   nilai_tajwid,
  },
  id
) => {
  return (
    await API.put("/hafalan/" + id, {
      baris,
      ayat_awal,
      ayat_akhir,
      surat_awal,
      surat_akhir,
      nilai_hafalan,
      nilai_tajwid,
    })
  ).data;
};


export const deleteHafalan = async (id) => {
   return (await API.delete(`/hafalan/${id}`)).data;
 };
 