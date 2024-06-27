import API from ".";

export const getAllKehadiran = async (idHalaqoh) => {
  return (
    await API.get("/kehadiran", {
      params: {
        page: 1,
        pageSize: 100,
        halaqoh: idHalaqoh,
      },
    })
  ).data;
};

export const getDetailKehadiran = async (id) => {
  return (await API.get("/kehadiran/" + id, )).data;
};

export const createKehadiran = async (
  { status, tanggal, user, halaqoh },
  meet
) => {
  return await API.post(
    "/kehadiran",
    { status, tanggal, user, halaqoh },
    {
      params: {
        meet: meet,
      },
    }
  );
};

export const updateKehadiran = async (body, meet, halaqohId) => {
  return await API.put("/kehadiran", body, {
    params: {
      meet: meet.replace("Meet ",""),
      halaqohId: halaqohId,
    },
  });
};
