import API from ".";

export const getAllUjian = async (siswaId) => {
  return (await API.get("/ujian" , {params: {
    page:1,
    pagesSize: 100,
    siswaId: siswaId
  }})).data;
};

export const getDetailUjian = async (id) => {
  return (await API.get("/ujian/" + id)).data;
};

export const createUjian = async ({
  tanggal,
  juz,
  kesalahan_hafalan,
  kesalahan_tajwid,
  keterangan,
  nilai_hafalan,
  nilai_tajwid,
  total_nilai,
  penguji,
  siswaId,
  halaqohId
}) => {
  return (
    await API.post("/ujian", {
      tanggal,
      juz,
      kesalahan_hafalan,
      kesalahan_tajwid,
      keterangan,
      nilai_hafalan,
      nilai_tajwid,
      total_nilai,
      penguji,
      siswaId,
      halaqohId
    })
  ).data;
};

export const updateUjian = async ({
  tanggal,
  juz,
  kesalahan_hafalan,
  kesalahan_tajwid,
  keterangan,
  nilai_hafalan,
  nilai_tajwid,
  total_nilai,
  penguji,
  siswaId,
  halaqohId
 }, id) => {
   return (
     await API.put("/ujian/" + id , {
      tanggal,
      juz,
      kesalahan_hafalan,
      kesalahan_tajwid,
      keterangan,
      nilai_hafalan,
      nilai_tajwid,
      total_nilai,
      penguji,
      siswaId,
      halaqohId
     })
   ).data;
 };

export const deleteUjian = async (id) => {
  return (await API.delete("/ujian/" + id)).data;
};
