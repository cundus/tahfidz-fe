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


export const updateKehadiran = async (
  { status, tanggal, user },
  meet,halaqohId
) => {
  return await API.put(
    "/kehadiran",
    { status, tanggal, user },
    {
      params: {
        meet: meet,
        halaqohId: halaqohId
      },
    }
  );
};
